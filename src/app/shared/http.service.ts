import { Injectable } from '@angular/core';
import { BaseRequestOptions, Http, Response, Request, RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { TokenService } from 'shared';

function mergeOptions(
    defaultOpts: BaseRequestOptions, providedOpts: RequestOptionsArgs, method: RequestMethod,
    url: string): RequestOptions {
    const newOptions = defaultOpts;
    if (providedOpts) {
        return newOptions.merge(new RequestOptions({
            method: providedOpts.method || method,
            url: providedOpts.url || url,
            search: providedOpts.search,
            headers: providedOpts.headers,
            body: providedOpts.body,
            withCredentials: providedOpts.withCredentials,
            responseType: providedOpts.responseType
        }));
    }
    if (method) {
        return newOptions.merge(new RequestOptions({ method: method, url: url }));
    } else {
        return newOptions.merge(new RequestOptions({ url: url }));
    }
}

@Injectable()
export class HttpService {
    constructor(
        private http: Http,
        private tokenService: TokenService) {
    }
    
    private _defaultOptions: BaseRequestOptions = new BaseRequestOptions();

    request(request: Request, options?: RequestOptionsArgs): Promise<Response> {
        // add authorization header if token exists
        let token = this.tokenService.getToken();
        if (token) {
            request.headers.set('Authorization', `Bearer ${token.access_token}`);
        }
        return new Promise<Response>((resolve, reject) => {
            this.http.request(request, options).subscribe(
                response => resolve(response),
                ex => reject(ex as Response)
            );
        });
    }

    getResponse(url: string, options?: RequestOptionsArgs): Promise<Response> {
        return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url)));
    }

    async get<T>(url: string, options?: RequestOptionsArgs): Promise<T> {
        return (await this.getResponse(url, options)).json() as T;
    }

    postResponse(url: string, body: any, options?: RequestOptionsArgs): Promise<Response> {
        return this.request(new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({ body: body })), options, RequestMethod.Post, url)));
    }

    async post<T>(url: string, body: any, options?: RequestOptionsArgs): Promise<T> {
        let response = await this.postResponse(url, body, options);
        if (response.text()) {
            return response.json() as T;
        }
    }

    putResponse(url: string, body: any, options?: RequestOptionsArgs): Promise<Response> {
        return this.request(new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({ body: body })), options, RequestMethod.Put, url)));
    }

    async put<T>(url: string, body: any, options?: RequestOptionsArgs): Promise<T> {
        let response = await this.putResponse(url, body, options);
        if (response.text()) {
            return response.json() as T
        }
    }

    deleteResponse(url: string, options?: RequestOptionsArgs): Promise<Response> {
        return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Delete, url)));
    }

    async delete<T>(url: string, options?: RequestOptionsArgs): Promise<T> {
        let response = await this.deleteResponse(url, options);
        if (response.text()) {
            return response.json() as T
        }
    }
}
