package dev.gethealthy.app.advices;

import dev.gethealthy.app.exceptions.HttpException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.HandlerMethod;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Add more controller advices ...

    @ExceptionHandler(HttpException.class)
    public final ResponseEntity<Object> handleHttpException(HttpException e, HandlerMethod handlerMethod) {
        if (e.getStatus() == null)
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(e.getData(), e.getStatus());
    }

    
}
