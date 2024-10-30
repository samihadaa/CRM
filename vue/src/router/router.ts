import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Product from '../pages/Product.vue';
import Clients from '../pages/Clients.vue';
import Settings from '../pages/Settings.vue';
import Services from '../pages/Services.vue';
import ClientGroups from '../pages/ClientGroups.vue';
//Sales pages
// import saleInvoice from '../pages/sales/Invoice.vue';
// import saleDeliveryNote from '../pages/sales/DeliveryNote.vue';
// import saleEstimate from '../pages/sales/Estimate.vue';
// import saleSaleOrder from '../pages/sales/SaleOrder.vue';
// Import other pages as necessary
// import purchaseInvoice from '../pages/purchases/Invoice.vue';
// import purchaseDeliveryNote from '../pages/purchases/DeliveryNote.vue';
// import purchaseEstimate from '../pages/purchases/Estimate.vue';
// import purchasePurchaseOrder from '../pages/purchases/PurchaseOrder.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/products', name: 'Products', component: Product },
     { path: '/clients', name: 'Clients', component: Clients },
     { path: '/settings', name: 'Settings', component: Settings },
     { path: '/services', name: 'Services', component: Services },
     { path: '/clientgroups', name: 'ClientGroups', component: ClientGroups },

  //Sales routes
  // { path: '/sale/invoice', name: 'saleInvoice', component: saleInvoice },
  // { path: '/sale/sale-order', name: 'saleSaleOrder', component: saleSaleOrder },
  // { path: '/sale/delivery-note', name: 'saleDeliveryNote', component: saleDeliveryNote },
  // { path: '/sale/estimate', name: 'saleEstimate', component: saleEstimate },
 //Purchases routes
//  { path: '/purchase/invoice', name: 'purchaseInvoice', component: purchaseInvoice },
//  { path: '/purchase/purchase-order', name: 'purchasePurchaseOrder ', component: purchasePurchaseOrder  },
//   { path: '/purchase/delivery-note', name: 'purchaseDeliveryNote', component: purchaseDeliveryNote },
//   { path: '/purchase/estimate', name: 'purchaseEstimate', component: purchaseEstimate },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
