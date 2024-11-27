package dev.gethealthy.app.exceptions;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@Setter
@ToString
public class HttpException extends RuntimeException {
    private Object data;
    private HttpStatusCode status;

    public HttpException(){
        this(HttpStatus.INTERNAL_SERVER_ERROR, null);
    }

    public HttpException(Object data){
        this(HttpStatus.INTERNAL_SERVER_ERROR, data);
    }

    public HttpException(HttpStatus status, Object data){
        this.data = data;
        this.status = status;
    }

}
