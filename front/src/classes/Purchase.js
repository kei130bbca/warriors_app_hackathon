export default class Purchase {
  constructor(
    purchase_id,
    user_id,
    product_id,
    count,
    bouth_at,
    comment,
    stars,
    title
  ) {
    this.purchase_id = purchase_id;
    this.user_id = user_id;
    this.product_id = product_id;
    this.count = count;
    this.bouth_at = bouth_at;
    this.comment = comment;
    this.stars = stars;
    this.title = title;
  }
}
