// src/common/interceptors/response-wrapper.interceptor.ts

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-res.interface';
@Injectable()
export class ResponseWrapperInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {

  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    // 1. GHI LẠI THỜI GIAN BẮT ĐẦU (Start Time)
    const now = Date.now();

    // 2. XỬ LÝ REQUEST VÀ PHẢN HỒI
    return next.handle().pipe(
      map(data => {
        // 3. TÍNH TOÁN THỜI GIAN XỬ LÝ (End Time - Start Time)
        const responseTimeMs = Date.now() - now;

        // 4. BỌC DỮ LIỆU VÀ TRẢ VỀ CẤU TRÚC CHUNG
        return {
          code: context.switchToHttp().getResponse().statusCode || 200,
          // Lấy mã trạng thái HTTP thực tế, mặc định là 200
          message: 'Request successful',
          // Thông báo mặc định cho phản hồi thành công
          data: data,
          responseTimeMs: responseTimeMs,
        };
      }),
    );
  }
}