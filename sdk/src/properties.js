
class ItemBuilder {
  constructor() {
    this.item = {};
  }

  productId(value) {
    this.item['abx:product_id'] = { value, type: 'string' };
    return this;
  }

  productName(value) {
    this.item['abx:product_name'] = { value, type: 'string' };
    return this;
  }

  price(value) {
    this.item['abx:price'] = { value, type: 'double' };
    return this;
  }

  discount(value) {
    this.item['abx:discount'] = { value, type: 'double' };
    return this;
  }

  quantity(value) {
    this.item['abx:quantity'] = { value, type: 'long' };
    return this;
  }

  category1(value) {
    this.item['abx:category1'] = { value, type: 'string' };
    return this;
  }

  category2(value) {
    this.item['abx:category2'] = { value, type: 'string' };
    return this;
  }

  category3(value) {
    this.item['abx:category3'] = { value, type: 'string' };
    return this;
  }

  category4(value) {
    this.item['abx:category4'] = { value, type: 'string' };
    return this;
  }

  category5(value) {
    this.item['abx:category5'] = { value, type: 'string' };
    return this;
  }

  currency(value) {
    this.item['abx:currency'] = { value, type: 'string' };
    return this;
  }

  customString(key, value) {
    this.item[key] = { value, type: 'string' };
    return this;
  }

  customLong(key, value) {
    this.item[key] = { value, type: 'long' };
    return this;
  }

  customDouble(key, value) {
    this.item[key] = { value, type: 'double' };
    return this;
  }

  customBool(key, value) {
    this.item[key] = { value, type: 'boolean' };
    return this;
  }

  build() {
    return this.item;
  }
}

class PropertiesBuilder {
  constructor(initialProperties = {}) {
    this.properties = { ...initialProperties };
  }

  items(itemsInput) {
    let itemsArray;
    if (Array.isArray(itemsInput)) {
      itemsArray = itemsInput;
    } else if (itemsInput && typeof itemsInput === 'object') {
      itemsArray = [itemsInput];
    } else {
      console.warn('[Properties] items() expects an array or single item object');
      return this;
    }

    this.properties['abx:items'] = itemsArray;
    return this;
  }

  orderId(value) {
    this.properties['abx:order_id'] = { value, type: 'string' };
    return this;
  }

  orderSales(value) {
    this.properties['abx:order_sales'] = { value, type: 'double' };
    return this;
  }

  deliveryCharge(value) {
    this.properties['abx:delivery_charge'] = { value, type: 'double' };
    return this;
  }

  penaltyCharge(value) {
    this.properties['abx:penalty_charge'] = { value, type: 'double' };
    return this;
  }

  paymentMethod(value) {
    this.properties['abx:payment_method'] = { value, type: 'string' };
    return this;
  }
  
  discount(value) {
    this.properties['abx:discount'] = { value, type: 'double' };
    return this;
  }

  signChannel(value) {
    this.properties['abx:sign_channel'] = { value, type: 'string' };
    return this;
  }

  inviteChannel(value) {
    this.properties['abx:invite_channel'] = { value, type: 'string' };
    return this;
  }

  sharingChannel(value) {
    this.properties['abx:sharing_channel'] = { value, type: 'string' };
    return this;
  }

  category1(value) {
    this.properties['abx:category1'] = { value, type: 'string' };
    return this;
  }

  category2(value) {
    this.properties['abx:category2'] = { value, type: 'string' };
    return this;
  }

  category3(value) {
    this.properties['abx:category3'] = { value, type: 'string' };
    return this;
  }

  category4(value) {
    this.properties['abx:category4'] = { value, type: 'string' };
    return this;
  }

  category5(value) {
    this.properties['abx:category5'] = { value, type: 'string' };
    return this;
  }

  keyword(value) {
    this.properties['abx:keyword'] = { value, type: 'string' };
    return this;
  }

  prevVer(value) {
    this.properties['abx:prev_ver'] = { value, type: 'string' };
    return this;
  }

  currVer(value) {
    this.properties['abx:curr_ver'] = { value, type: 'string' };
    return this;
  }

  level(value) {
    this.properties['abx:level'] = { value, type: 'long' };
    return this;
  }

  stage(value) {
    this.properties['abx:stage'] = { value, type: 'string' };
    return this;
  }

  isSkip(value) {
    this.properties['abx:is_skip'] = { value, type: 'boolean' };
    return this;
  }

  customDouble(key, value) {
    this.properties[key] = { value, type: 'double' };
    return this;
  }
  
  customLong(key, value) {
    this.properties[key] = { value, type: 'long' };
    return this;
  }

  customString(key, value) {
    this.properties[key] = { value, type: 'string' };
    return this;
  }

  customBool(key, value) {
    this.properties[key] = { value, type: 'boolean' };
    return this;
  }


  build() {
    return this.properties;
  }
}

const createBuilderMethod = (methodName) => {
  return function(...args) {
    const builder = new PropertiesBuilder();
    return builder[methodName](...args);
  };
};

export const ABProperty = {
  items: createBuilderMethod('items'),
  orderId: createBuilderMethod('orderId'),
  orderSales: createBuilderMethod('orderSales'),
  deliveryCharge: createBuilderMethod('deliveryCharge'),
  penaltyCharge: createBuilderMethod('penaltyCharge'),
  paymentMethod: createBuilderMethod('paymentMethod'),
  discount: createBuilderMethod('discount'),

  signChannel: createBuilderMethod('signChannel'),
  inviteChannel: createBuilderMethod('inviteChannel'),
  sharingChannel: createBuilderMethod('sharingChannel'),

  category1: createBuilderMethod('category1'),
  category2: createBuilderMethod('category2'),
  category3: createBuilderMethod('category3'),
  category4: createBuilderMethod('category4'),
  category5: createBuilderMethod('category5'),
  keyword: createBuilderMethod('keyword'),

  prevVer: createBuilderMethod('prevVer'),
  currVer: createBuilderMethod('currVer'),

  level: createBuilderMethod('level'),
  stage: createBuilderMethod('stage'),
  isSkip: createBuilderMethod('isSkip'),

  customDouble: createBuilderMethod('customDouble'),
  customLong: createBuilderMethod('customLong'),
  customString: createBuilderMethod('customString'),
  customBool: createBuilderMethod('customBool'),
};

export const ABItem = () => new ItemBuilder();

export default ABProperty; 