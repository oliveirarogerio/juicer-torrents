{
"openapi": "3.1.0",
"info": {
"title": "ThePirateAPI",
"version": "0.1.0"
},
"paths": {
"/": {
"get": {
"summary": "Hello",
"operationId": "hello\_\_get",
"responses": {
"200": {
"description": "Successful Response",
"content": {
"application/json": {
"schema": {

                }
              }
            }
          }
        }
      }
    },
    "/100": {
      "get": {
        "summary": "Top 100",
        "operationId": "top_100_100_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          }
        }
      }
    },
    "/search": {
      "get": {
        "summary": "Search",
        "operationId": "search_search_get",
        "parameters": [
          {
            "name": "query",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Search query",
              "default": "",
              "title": "Query"
            },
            "description": "Search query"
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "description": "Page number",
              "default": 1,
              "title": "Page"
            },
            "description": "Page number"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/rss/100": {
      "get": {
        "summary": "Rss",
        "operationId": "rss_rss_100_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          }
        }
      }
    },
    "/rss/search": {
      "get": {
        "summary": "Rss Search",
        "operationId": "rss_search_rss_search_get",
        "parameters": [
          {
            "name": "query",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Search query for RSS feed",
              "default": "",
              "title": "Query"
            },
            "description": "Search query for RSS feed"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    }

},
"components": {
"schemas": {
"HTTPValidationError": {
"properties": {
"detail": {
"items": {
"$ref": "#/components/schemas/ValidationError"
},
"type": "array",
"title": "Detail"
}
},
"type": "object",
"title": "HTTPValidationError"
},
"ValidationError": {
"properties": {
"loc": {
"items": {
"anyOf": [
{
"type": "string"
},
{
"type": "integer"
}
]
},
"type": "array",
"title": "Location"
},
"msg": {
"type": "string",
"title": "Message"
},
"type": {
"type": "string",
"title": "Error Type"
}
},
"type": "object",
"required": [
"loc",
"msg",
"type"
],
"title": "ValidationError"
}
}
}
}
