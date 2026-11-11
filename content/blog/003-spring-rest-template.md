---
order: 3
title: "Working with RestTemplate in Spring Boot"
subtitle: "Configure the classic synchronous HTTP client, make common requests, and understand when to move to RestClient."
category: "Spring"
publishedAt: "2026-11-11"
excerpt: "A practical guide to using RestTemplate in Spring Boot, including builder-based configuration, HTTP methods, request interceptors, error handling, and a gradual path to RestClient."
---

`RestTemplate` is Spring's synchronous HTTP client for applications that use the classic, imperative programming model. It remains useful when maintaining existing Spring applications, even as Spring's current documentation recommends `RestClient` for many new imperative use cases.

This guide covers the common `RestTemplate` patterns and shows how to move toward `RestClient` when you are ready. The examples use Spring Boot's `RestTemplateBuilder` so Boot's configured customizers can be applied.

## Configure a `RestTemplate`

In Spring Boot 4, use the injected `RestTemplateBuilder` rather than constructing a client directly. Boot can customize the builder with application-specific settings, such as message converters and observations. The package for this builder changed in Spring Boot 4; older releases use `org.springframework.boot.web.client.RestTemplateBuilder`.

```java
import org.springframework.boot.restclient.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

@Configuration
class RestTemplateConfig {

    @Bean
    RestTemplate apiRestTemplate(RestTemplateBuilder builder) {
        return builder
            .rootUri("https://api.example.com/v1")
            .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
            .build();
    }
}
```

Inject this bean into the component that calls the API. With the `rootUri` above, a request to `/users/42` is sent to `https://api.example.com/v1/users/42`.

## Make HTTP requests

### GET

Use `getForObject` when you only need the response body. Use `getForEntity` when you also need the status or headers.

```java
User user = restTemplate.getForObject("/users/{id}", User.class, 42);

ResponseEntity<User> response =
    restTemplate.getForEntity("/users/{id}", User.class, 42);

HttpStatusCode status = response.getStatusCode();
String etag = response.getHeaders().getETag();
User responseBody = response.getBody();
```

The body can be `null`, for example when the server returns no content. Check it before using it.

### POST

Use `postForObject` to read a response body or `postForEntity` when you also need response metadata, such as the `Location` header.

```java
User newUser = new User("Alice", "alice@example.com");

User createdUser = restTemplate.postForObject(
    "/users", newUser, User.class);

ResponseEntity<Void> response = restTemplate.postForEntity(
    "/users", newUser, Void.class);
URI location = response.getHeaders().getLocation();
```

The response body and `Location` header depend on the API's contract; either may be absent.

### PUT and DELETE

The convenience `put` and `delete` methods return `void`. If you need response headers, status, or a body, use `exchange` instead.

```java
restTemplate.put("/users/{id}", updatedUser, 42);
restTemplate.delete("/users/{id}", 42);
```

### Use `exchange` for more control

`exchange` lets you provide request headers and choose a response type. A `ParameterizedTypeReference` preserves generic type information when deserializing collections.

```java
HttpHeaders headers = new HttpHeaders();
headers.setBearerAuth(accessToken);
HttpEntity<Void> request = new HttpEntity<>(headers);

ResponseEntity<List<User>> response = restTemplate.exchange(
    "/users",
    HttpMethod.GET,
    request,
    new ParameterizedTypeReference<List<User>>() {}
);
```

Obtain `accessToken` from your application's secure token provider. Do not hard-code credentials in source code.

## Add cross-cutting request behavior

A `ClientHttpRequestInterceptor` can apply behavior to outgoing requests, such as adding authentication headers or collecting request metadata.

```java
class AuthInterceptor implements ClientHttpRequestInterceptor {

    private final TokenProvider tokenProvider;

    AuthInterceptor(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    public ClientHttpResponse intercept(
            HttpRequest request,
            byte[] body,
            ClientHttpRequestExecution execution) throws IOException {
        request.getHeaders().setBearerAuth(tokenProvider.currentToken());
        return execution.execute(request, body);
    }
}
```

Register the interceptor on the builder:

```java
@Bean
RestTemplate authenticatedRestTemplate(
        RestTemplateBuilder builder,
        TokenProvider tokenProvider) {
    return builder
        .additionalInterceptors(new AuthInterceptor(tokenProvider))
        .build();
}
```

Treat request and response data carefully when adding logging: avoid logging credentials, personal data, or other sensitive values.

## Handle errors

By default, `RestTemplate` uses an error handler that raises an exception for 4xx and 5xx responses. Catch the specific exception types your application can recover from; the response body is available when an API returns useful error details.

```java
try {
    User user = restTemplate.getForObject(
        "/users/{id}", User.class, userId);
} catch (HttpClientErrorException.NotFound exception) {
    // Handle a missing user.
    String errorBody = exception.getResponseBodyAsString();
} catch (HttpServerErrorException exception) {
    // Apply the application's policy for upstream server failures.
}
```

Use a custom `ResponseErrorHandler` when the same non-default error policy needs to be applied across requests. For a one-off request, handling the relevant exception is often simpler.

## Move gradually to `RestClient`

`RestClient` is Spring's newer synchronous, fluent API. Spring's current documentation recommends it for many new imperative applications, while `RestTemplate` remains available for existing code. You can migrate incrementally by creating a `RestClient` from an existing configured `RestTemplate`:

```java
@Bean
RestClient modernClient(RestTemplate apiRestTemplate) {
    return RestClient.create(apiRestTemplate);
}
```

Then use the fluent API for new calls:

```java
User user = modernClient.get()
    .uri("/users/{id}", 42)
    .retrieve()
    .body(User.class);
```

Although `RestClient` and `RestTemplate` share Spring's HTTP client infrastructure, review the behavior of each migrated request and test it against the upstream API. This is especially important when you rely on custom request factories, interceptors, or error handling.

## When should you use `RestTemplate`?

Keep using `RestTemplate` when it is already established in your application and meets your needs. For new synchronous integrations, consider `RestClient`; use `WebClient` when you need its reactive, non-blocking model.

The key is to choose deliberately, configure the client through Spring Boot, and make error handling and credentials part of the design rather than afterthoughts.
