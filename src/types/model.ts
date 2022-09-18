export abstract class Model {
  static single: string;

  static plural: string;

  static singleDisplayText: string;

  static pluralDisplayText: string;

  static prefix?: string;

  static editLink?: (id: string) => string[];

  static createLink?: string[];

  static createText?: string;

  static embeddingOptions?: { [key: string]: string };

  id: string;

  name: string;

  displayText?: string;
}
