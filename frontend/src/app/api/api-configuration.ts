/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = 'https://ezq2n9nwzk.execute-api.us-east-2.amazonaws.com/prod';
}

export interface ApiConfigurationInterface {
  rootUrl?: string;
}
