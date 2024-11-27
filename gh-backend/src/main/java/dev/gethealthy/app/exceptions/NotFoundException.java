package dev.gethealthy.app.exceptions;

import org.springframework.http.HttpStatus;

public class NotFoundException extends HttpException{
    private static final HttpStatus StatusCode = HttpStatus.NOT_FOUND;

    public NotFoundException() {
        super(StatusCode, null);
    }

    public NotFoundException(Object data) {
        super(StatusCode, data);
    }
}
