import { UrlId } from "../valueObjects/url/UrlId";
import { UrlString } from "../valueObjects/url/UrlString";
import { UrlUserEmail } from "../valueObjects/url/UrlUseremail";

export class Url {
  readonly id: UrlId;
  readonly originalUrl: UrlString;
  readonly shortenedUrl: UrlString;
  readonly userEmail: UrlUserEmail;

  constructor (id: UrlId, originalUrl: UrlString, shortenedUrl: UrlString, userEmail: UrlUserEmail) {
    this.id = id;
    this.originalUrl = originalUrl;
    this.shortenedUrl = shortenedUrl;
    this.userEmail = userEmail;
  }

  static fromPrimitives(plainData: { id: string, originalUrl: string; shortenedUrl: string, userEmail:string}): Url {
    return new Url(
      new UrlId(plainData.id),
      new UrlString(plainData.originalUrl),
      new UrlString(plainData.shortenedUrl),
      new UrlUserEmail(plainData.userEmail)
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      originalUrl : this.originalUrl.value,
      shortenedUrl : this.shortenedUrl.value,
      userEmail : this.userEmail.value
    };
  }

}