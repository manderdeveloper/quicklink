import { UrlId } from "../valueObjects/url/UrlId";
import { UrlString } from "../valueObjects/url/UrlString";
import { UrlUserId } from "../valueObjects/url/UrlUserId";

export class Url {
  readonly id: UrlId;
  readonly originalUrl: UrlString;
  readonly shortenedUrl: UrlString;
  readonly userId: UrlUserId;

  constructor (id: UrlId, originalUrl: UrlString, shortenedUrl: UrlString, userId: UrlUserId) {
    this.id = id;
    this.originalUrl = originalUrl;
    this.shortenedUrl = shortenedUrl;
    this.userId = userId;
  }

  static fromPrimitives(plainData: { id: string, originalUrl: string; shortenedUrl: string, userId:string}): Url {
    return new Url(
      new UrlId(plainData.id),
      new UrlString(plainData.originalUrl),
      new UrlString(plainData.shortenedUrl),
      new UrlUserId(plainData.userId)
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      originalUrl : this.originalUrl.value,
      shortenedUrl : this.shortenedUrl.value,
      userId : this.userId.value
    };
  }

}