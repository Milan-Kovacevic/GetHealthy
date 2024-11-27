package dev.gethealthy.app.exceptions;

import org.springframework.http.HttpStatus;

public class ConflictException extends HttpException{
    private static final HttpStatus StatusCode = HttpStatus.CONFLICT;

    public ConflictException() {
        super(StatusCode, null);
    }

    public ConflictException(Object data) {
        super(StatusCode, data);
    }
}
