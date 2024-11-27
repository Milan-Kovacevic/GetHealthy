package dev.gethealthy.app.exceptions;

import org.springframework.http.HttpStatus;

public class UnauthorizedException extends HttpException{
    private static final HttpStatus StatusCode = HttpStatus.UNAUTHORIZED;

    public UnauthorizedException() {
        super(StatusCode, null);
    }

    public UnauthorizedException(Object data) {
        super(StatusCode, data);
    }
}
