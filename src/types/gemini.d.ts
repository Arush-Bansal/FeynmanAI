export interface GeminiFunctionParameter {
  type: string;
  description?: string;
  enum?: string[];
  properties?: { [key: string]: GeminiFunctionParameter };
  items?: GeminiFunctionParameter;
  required?: string[];
}

export interface GeminiFunctionDeclaration {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: { [key: string]: GeminiFunctionParameter };
    required?: string[];
  };
}

export interface GeminiTool {
  functionDeclarations: GeminiFunctionDeclaration[];
}
