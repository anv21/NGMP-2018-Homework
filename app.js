import config from './config/config';
import { User, Product } from './models';

console.log(config.name);

let user = new User;
user.logModelName();

let product = new Product;
product.logModelName();
