import { DynamoDBClient, PutItemCommand, GetItemCommand, ScanCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { injectable } from "inversify";
import { Url } from "../../../../domain/models/Url";
import { UrlRepository } from "../../../../domain/repositories/UrlRepository";

@injectable()
export class DynamoUrlRepository implements UrlRepository {
  private client: DynamoDBClient;
  private tableName: string = process.env.AWS_URL_TABLE;
  private indexName: string = 'shortenedUrl-index';
  constructor() {
    this.client = new DynamoDBClient({ region: process.env.AWS_REGION });
  }

  async getById(id: string): Promise<Url | null> {
    const getItemCommand = new GetItemCommand({
      TableName: this.tableName,
      Key: {
        id: { S: id },
      },
    });

    try {
      const response = await this.client.send(getItemCommand);
      const item = response.Item;
      if (item) {
        const url: Url = Url.fromPrimitives({
          id: item.id.S!,
          originalUrl: item.originalUrl.S!,
          shortenedUrl: item.shortenedUrl.S!,
          userEmail: item.userEmail.S!
        });
        return url;
      }
      return null;
    } catch (error) {
      console.error("Error fetching URL from DynamoDB:", error);
      return null;
    }
  }

  async create(url: Url): Promise<void> {
    const putItemCommand = new PutItemCommand({
      TableName: this.tableName,
      Item: {
        id: { S: url.id.value },
        originalUrl: { S: url.originalUrl.value },
        shortenedUrl: { S: url.shortenedUrl.value },
        userEmail: { S: url.userEmail.value },
      },
    });
    await this.client.send(putItemCommand);
  }

  async getByShortenedUrl(shortenedUrl: string): Promise<Url | null>{
   const queryCommand = new QueryCommand({
      TableName: this.tableName,
      IndexName: this.indexName,
      KeyConditionExpression: "shortenedUrl = :shortenedUrl",
      ExpressionAttributeValues: {
        ":shortenedUrl": { S: shortenedUrl },
      },
    });

    try {
      const response = await this.client.send(queryCommand);
      const items = response.Items;
      
      if (items && items.length > 0) {
        const item = items[0];
         const url: Url = Url.fromPrimitives({
          id: item.id.S!,
          originalUrl: item.originalUrl.S!,
          shortenedUrl: item.shortenedUrl.S!,
          userEmail: item.userEmail.S!
        });
        return url;
      }

      return null;
    } catch (error) {
      console.error("Error fetching URL from DynamoDB:", error);
      return null;
    }
  }

  async getAll(): Promise<Url[]> {
    const scanCommand = new ScanCommand({
      TableName: this.tableName,
    });
    const response = await this.client.send(scanCommand);
    const items = response.Items;
    const urls: Url[] = [];

    if (items) {
      for (const item of items) {
        const url: Url = Url.fromPrimitives({
          id: item.id.S!,
          originalUrl: item.originalUrl.S!,
          shortenedUrl: item.shortenedUrl.S!,
          userEmail: item.userEmail.S!
        });
        urls.push(url);
      }
    }

    return urls;
  };
  
  async update(model: Url): Promise<void> {};
  async delete(id: string): Promise<void> {};
}
