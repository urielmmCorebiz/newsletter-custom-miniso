export class GraphQLExtensionError extends Error {
  constructor(message: any, public statusCode?: any, public extensions?: any) {
    super(message)
  }
}