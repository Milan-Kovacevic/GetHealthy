package dev.gethealthy.app.exceptions;

import org.springframework.http.HttpStatus;

public class ForbiddenException extends HttpException{
    private static final HttpStatus StatusCode = HttpStatus.FORBIDDEN;

    public ForbiddenException() {
        super(StatusCode, null);
    }

    public ForbiddenException(Object data) {
        super(StatusCode, data);
    }
}
