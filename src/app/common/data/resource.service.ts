import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicResourceService, IBaasicQueryModel, IOptions } from 'baasic-sdk-angular';
import { ModalService } from 'common';

@Injectable()
export class ResourceService {

    constructor(
        private dynamicResourceService: DynamicResourceService,
        private router: Router,
        private modalService: ModalService
    ) { }

    async find<TModel>(schemaName: string, options?: IOptions): Promise<IBaasicQueryModel<TModel>> {
        try {
            return (await this.dynamicResourceService.find(schemaName, options)).data as IBaasicQueryModel<TModel>;
        } catch (err) {
            this.handleError(err);
        }
    }

    async get<TModel>(schemaName: string, id: string, options?: IOptions): Promise<TModel> {
        try {
            return (await this.dynamicResourceService.get(schemaName, id, options)).data as TModel;
        } catch (err) {
            this.handleError(err);
        }
    }

    async create<TModel>(schemaName: string, data: TModel): Promise<TModel> {
        try {
            return (await this.dynamicResourceService.create(schemaName, data)).data as TModel;
        } catch (err) {
            this.handleError(err);
        }
    }

    async update<TModel>(schemaName: string, data: TModel, options?: any): Promise<void> {
        try {
            return (await this.dynamicResourceService.update(schemaName, data, options)).data;
        } catch (err) {
            this.handleError(err);
        }
    }

    async patch<TModel>(schemaName: string, data: any, options?: any): Promise<void> {
        try {
            return (await this.dynamicResourceService.patch(schemaName, data, options)).data;
        } catch (err) {
            this.handleError(err);
        }
    }

    async remove<TModel>(schemaName: string, data: TModel, options?: any): Promise<void> {
        try {
            return (await this.dynamicResourceService.remove(schemaName, data, options)).data;
        } catch (err) {
            this.handleError(err);
        }
    }

    private handleError(error: any): void {
        if (error.statusCode === 401) {
            this.modalService.open();
        } else {
            throw error;
        }
    }
}