import { ApolloError } from "@apollo/client";

export const getGraphQLErrorMessage = (error: any): string => {
  if (error instanceof ApolloError) {
    const messages: string[] = error.graphQLErrors
      .map((item) => {
        const originalError = item.extensions?.originalError as any;
        const errorMessage = originalError?.message;

        if (Array.isArray(errorMessage)) {
          return errorMessage.join(", ");
        } else if (typeof errorMessage === "string") {
          return errorMessage;
        }
        return "Error desconocido 500";
      })
      .filter(Boolean); // Filtra cualquier mensaje vacío

    return messages.length > 0 ? messages.join(", ") : "Error desconocido 500";
  }

  return "Error desconocido 500";
};
