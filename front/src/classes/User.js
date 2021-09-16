export default class User {
  constructor(
    id,
    username,
    nickname,
    twitter_screenname,
    youtube_url,
    password,
    icon,
    desc
  ) {
    this.id = id;
    this.username = username;
    this.nickname = nickname;
    this.twitter_screenname = twitter_screenname;
    this.youtube_url = youtube_url;
    this.password = password;
    this.icon = icon;
    this.desc = desc;
  }
}
