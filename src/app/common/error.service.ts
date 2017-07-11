import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Response } from '@angular/http';
import { Message, MessageType, MessageService, HttpStatusCode } from 'common';

@Injectable()
export class ErrorService implements ErrorHandler {
    private messageService: MessageService;

    constructor(private injector: Injector) {
        //needed to resolve circular dependency, the problem is related to messageService injecting router and router injects something else which probably at the point when angular plugs in the global error handler hasn't been injected
        setTimeout(() => this.messageService = injector.get(MessageService));
    }

    handleError(error) {
        //setTimeout is needed in special scenarios when an error occured in an async method before await call. 
        //The returned error is the same "zone promise" one as if it occured after the await, but if a messageService is called below (and internally it uses router.navigate which is also a promise),
        //it will hang until another, new promise resolution happens. The setTimeout apparently executes code after the errored out promise has finished and fixes the problem.
        setTimeout(() => {

            if (error && error.rejection instanceof Response) {
                this.handleHttpError(error.rejection as Response);
            }
            else {
                let errorMessage = (error && error.rejection && error.rejection.message) || (error && error.message) || 'Unknown error';
                this.messageService.show(new Message(
                    MessageType.Error,
                    `<h1 class="type--medium spc--bottom--med">An unexpected error has occurred, please contact support.</h1>
                    <p class="type--bold type--warning spc--bottom--sml">{{error}}.</p>
                    <p class="type--small">{{stackTrace}}</p>`,
                    { error: errorMessage, stackTrace: error.stack }
                ));
                console.error(errorMessage);
            }
        });
    }

    private handleHttpError(response: Response) {
        //401 is handled directly in HttpService, by logging out the user - TODO: handle it here, inject loginService and do loginService.logout, WARNING - possible other cyclic dependency injection problems in that case
        if (response.status != 401) {
            let serverException = (response.text() ? response.json() : undefined) as IServerException;
            let displayError = {} as IServerDisplayError;
            displayError.statusCode = `${response.status} - ${HttpStatusCode[response.status]}`;
            if (serverException) {
                displayError.type = serverException.exceptionType || '';
                displayError.message = serverException.exceptionMessage || '';
                displayError.stackTrace = serverException.stackTrace || '';
            }
            this.messageService.show(new Message(
                MessageType.Error,
                `<h1 class="type--medium spc--bottom--med">A server communication error has occured, please contact support.</h1>
                <p class="type--bold type--warning spc--bottom--sml">Http status {{statusCode}}.</p>
                <p class="spc--bottom--tiny type--small">{{type}}</p>
                <p class="spc--bottom--sml type--small">{{message}}</p>
                <p class="spc--bottom--sml type--small">{{stackTrace}}</p>`,
                displayError
            ));
        }
    }
}

interface IServerException {
    exceptionMessage: string,
    exceptionType: string,
    stackTrace: string
}

interface IServerDisplayError {
    type: string,
    message: string,
    stackTrace: string,
    statusCode: string
}
