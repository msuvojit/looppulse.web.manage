Products = new Meteor.Collection('products', {
  transform: function(doc) {
    return new Product(doc);
  }
});

/**
 * - belongs to a {@link Company}
 * - has many {@link Installation}
 *
 * @param doc
 * @constructor
 *
 * @property name
 * @property companyId
 */
Product = function(doc) {
  _.extend(this, doc);
};

Product.prototype.save = function() {
  var selector = {
    companyId: this.companyId,
    name: this.name
  };
  var modifier = {
    $set: {
      categoryId: this.categoryId
    }
  };
  var result = Products.upsert(selector, modifier);
  if (result.insertedId) {
    this._id = result.insertedId;
  } else {
    this._id = Products.findOne(selector)._id;
  }
  return this._id;
};