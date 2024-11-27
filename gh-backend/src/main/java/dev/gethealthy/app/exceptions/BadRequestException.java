package dev.gethealthy.app.exceptions;

import org.springframework.http.HttpStatus;

public class BadRequestException extends HttpException {
    private static final HttpStatus StatusCode = HttpStatus.BAD_REQUEST;

    public BadRequestException() {
        super(StatusCode, null);
    }

    public BadRequestException(Object data) {
        super(StatusCode, data);
    }
}
