var payments = crossfilter([
  {date: "2011-11-14T16:17:54Z", quantity: 2, total: 190, tip: 100, type: "tab", productIDs:["001"]},
  {date: "2011-11-14T16:20:19Z", quantity: 2, total: 190, tip: 100, type: "tab", productIDs:["001", "005"]},
  {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa", productIDs:["004" ,"005"]},
  {date: "2011-11-14T16:30:43Z", quantity: 2, total: 90, tip: 0, type: "tab", productIDs:["001", "002"]},
  {date: "2011-11-14T16:48:46Z", quantity: 2, total: 90, tip: 0, type: "tab", productIDs:["005"]},
  {date: "2011-11-14T16:53:41Z", quantity: 2, total: 90, tip: 0, type: "tab", productIDs:["001", "004" ,"005"]},
  {date: "2011-11-14T16:54:06Z", quantity: 1, total: 100, tip: 0, type: "cash", productIDs:["001", "002", "003", "004" ,"005"]},
  {date: "2011-11-14T16:58:03Z", quantity: 2, total: 90, tip: 0, type: "tab", productIDs:["001"]},
  {date: "2011-11-14T17:07:21Z", quantity: 2, total: 90, tip: 0, type: "tab", productIDs:["004" ,"005"]},
  {date: "2011-11-14T17:22:59Z", quantity: 2, total: 90, tip: 0, type: "tab", productIDs:["001", "002", "004" ,"005"]},
  {date: "2011-11-14T17:25:45Z", quantity: 2, total: 200, tip: 0, type: "cash", productIDs:["002"]},
  {date: "2011-11-14T17:29:52Z", quantity: 1, total: 200, tip: 100, type: "visa", productIDs:["004"]}
]);

var paymentsByType = payments.dimension(function(d) { return d.type; });
var groupByType = paymentsByType.group();

var paymentsByTypeCharacter = payments.dimension(function(d) { return d.type; }, true);
var groupByTypeCharacter = paymentsByTypeCharacter.group();

var paymentsByProductID = payments.dimension(function(d) { return d.productIDs; }, true);
var quantityGroupByProduct = paymentsByProductID.group().reduceSum(function(d) { return d.quantity; });

var typeCountChart = dc.pieChart('#chart1');
typeCountChart
.dimension(paymentsByType)
.group(groupByType);


var typeCharacterCountChart = dc.pieChart('#chart2');
typeCharacterCountChart
.dimension(paymentsByTypeCharacter)
.group(groupByTypeCharacter);


var productQuantityChart = dc.rowChart('#chart3');
productQuantityChart
  .dimension(paymentsByProductID)
  .group(quantityGroupByProduct);


dc.renderAll();
