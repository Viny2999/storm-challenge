import * as dotenv from 'dotenv';
import { MovieGenre } from '../entity/enum/MovieGenre.enum';
import { UserRole } from '../entity/enum/UserRole.enum';
dotenv.config();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const URL = `http://${host}:${port}`;

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    description: 'Swagger Documentation',
    version: '1.0.0',
    title: 'Storm Challenge'
  },
  servers: [{ url: `${URL}/v1` }],
  paths: {
    '/login': {
      post: {
        tags: ['Login'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    format: 'email'
                  },
                  password: {
                    type: 'string',
                    format: 'password'
                  }
                },
                required: ['email', 'password']
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Successful Operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array'
                }
              }
            }
          }
        }
      }
    },
    '/user/view/my': {
      get: {
        tags: ['User'],
        responses: {
          200: {
            description: 'Successful Operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array'
                }
              }
            }
          }
        },
        security: [
          {
            bearerAuth: []
          }
        ]
      }
    },
    '/user/{id}': {
      get: {
        tags: ['User'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          200: {
            description: 'Successful Operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array'
                }
              }
            }
          }
        },
        security: [
          {
            bearerAuth: []
          }
        ]
      }
    },
    '/user': {
      post: {
        tags: ['User'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  email: {
                    type: 'string',
                    format: 'email'
                  },
                  password: {
                    type: 'string',
                    format: 'password'
                  },
                  role: {
                    type: 'string',
                    enum: Object.values(UserRole)
                  }
                },
                required: ['name', 'email', 'password']
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Successful Operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array'
                }
              }
            }
          }
        },
        security: [
          {
            bearerAuth: []
          }
        ]
      },
      put: {
        tags: ['User'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  email: {
                    type: 'string',
                    format: 'email'
                  },
                  password: {
                    type: 'string',
                    format: 'password'
                  },
                  role: {
                    type: 'string',
                    enum: Object.values(UserRole)
                  }
                },
                required: ['name', 'email', 'password']
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Successful Operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array'
                }
              }
            }
          }
        },
        security: [
          {
            bearerAuth: []
          }
        ]
      },
      delete: {
        tags: ['User'],
        responses: {
          200: {
            description: 'Successful Operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array'
                }
              }
            }
          }
        },
        security: [
          {
            bearerAuth: []
          }
        ]
      }
    },
    '/movie': {
      get: {
        tags: ['Movies'],
        parameters: [
          {
            name: 'name',
            in: 'query',
            schema: {
              type: 'string',
            }
          },
          {
            name: 'director',
            in: 'query',
            schema: {
              type: 'string',
            }
          },
          {
            name: 'genre',
            in: 'query',
            schema: {
              type: 'string',
              enum: Object.values(MovieGenre)
            }
          }
        ],
        responses: {
          201: {
            description: 'Successful Operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array'
                }
              }
            }
          }
        },
        security: [
          {
            bearerAuth: []
          }
        ]
      },
      post: {
        tags: ['Movies'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  description: {
                    type: 'string',
                  },
                  director: {
                    type: 'string',
                  },
                  genre: {
                    type: 'string',
                    enum: Object.values(MovieGenre)
                  }
                },
                required: ['name', 'description', 'director', 'genre']
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Successful Operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array'
                }
              }
            }
          }
        },
        security: [
          {
            bearerAuth: []
          }
        ]
      }
    },
    '/movie/{id}': {
      get: {
        tags: ['Movies'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          200: {
            description: 'Successful Operation',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string'
                    },
                    name: {
                      type: 'string'
                    },
                    description: {
                      type: 'string'
                    },
                    director: {
                      type: 'string'
                    },
                    genre: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          },
          404: {
            description: 'Movie not found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        },
        security: [
          {
            bearerAuth: []
          }
        ]
      }
    },
    '/movie/{id}/vote': {
      post: {
        tags: ['Movies'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  rating: {
                    type: 'integer',
                    minimum: 0,
                    maximum: 4
                  }
                },
                required: ['rating']
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Successful Operation',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        },
        security: [
          {
            bearerAuth: []
          }
        ]
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

export const SwaggerDefinition = swaggerDef;
