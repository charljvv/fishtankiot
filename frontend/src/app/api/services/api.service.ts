/* tslint:disable */
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpHeaders
} from "@angular/common/http";
import { BaseService as __BaseService } from "../base-service";
import { ApiConfiguration as __Configuration } from "../api-configuration";
import { StrictHttpResponse as __StrictHttpResponse } from "../strict-http-response";
import { Observable as __Observable } from "rxjs";
import { map as __map, filter as __filter } from "rxjs/operators";

import { Empty } from "../models/empty";
import { SensorData } from "../models/sensor-data";
@Injectable({
  providedIn: "root"
})
class ApiService extends __BaseService {
  static readonly xAmazonApigatewayAnyMethodPath = "/";
  static readonly xAmazonApigatewayAnyMethodApiPath = "/api";
  static readonly xAmazonApigatewayAnyMethodApiSensorsPath = "/api/sensors";
  static readonly getApiSensorsAllPath = "/api/sensors/all";
  static readonly getApiSensorsLatestPath = "/api/sensors/latest";

  constructor(config: __Configuration, http: HttpClient) {
    super(config, http);
  }
  xAmazonApigatewayAnyMethodResponse(): __Observable<
    __StrictHttpResponse<null>
  > {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "X-AMAZON-APIGATEWAY-ANY-METHOD",
      this.rootUrl + `/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: "json"
      }
    );

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  xAmazonApigatewayAnyMethod(): __Observable<null> {
    return this.xAmazonApigatewayAnyMethodResponse().pipe(
      __map(_r => _r.body as null)
    );
  }
  xAmazonApigatewayAnyMethodApiResponse(): __Observable<
    __StrictHttpResponse<null>
  > {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "X-AMAZON-APIGATEWAY-ANY-METHOD",
      this.rootUrl + `/api`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: "json"
      }
    );

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  xAmazonApigatewayAnyMethodApi(): __Observable<null> {
    return this.xAmazonApigatewayAnyMethodApiResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @return 200 response
   */
  xAmazonApigatewayAnyMethodApiSensorsResponse(): __Observable<
    __StrictHttpResponse<Empty>
  > {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "X-AMAZON-APIGATEWAY-ANY-METHOD",
      this.rootUrl + `/api/sensors`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: "json"
      }
    );

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as __StrictHttpResponse<Empty>;
      })
    );
  }
  /**
   * @return 200 response
   */
  xAmazonApigatewayAnyMethodApiSensors(): __Observable<Empty> {
    return this.xAmazonApigatewayAnyMethodApiSensorsResponse().pipe(
      __map(_r => _r.body as Empty)
    );
  }

  /**
   * @return 200 response
   */
  getApiSensorsAllResponse(): __Observable<__StrictHttpResponse<Empty>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/sensors/all`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: "json"
      }
    );

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as __StrictHttpResponse<Empty>;
      })
    );
  }
  /**
   * @return 200 response
   */
  getApiSensorsAll(): __Observable<any> {
    return this.getApiSensorsAllResponse().pipe(__map(_r => _r.body as any));
  }

  /**
   * @return 200 response
   */
  getApiSensorsLatestResponse(): __Observable<
    __StrictHttpResponse<SensorData>
  > {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/sensors/latest`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: "json"
      }
    );

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as __StrictHttpResponse<SensorData>;
      })
    );
  }
  /**
   * @return 200 response
   */
  getApiSensorsLatest(): __Observable<SensorData> {
    return this.getApiSensorsLatestResponse().pipe(
      __map(_r => _r.body as SensorData)
    );
  }
}

module ApiService {}

export { ApiService };
