$(function(){

    renderProduct('Помідори', 101);
    renderProduct('Печиво', 3);
    renderProduct('Сир', 1);

    $('#add').click(function () {
        const $prod = $('#name-prod');
        renderProduct($prod.val());
        $prod.val("");
    });
});

function createProduct(prodName, prodQuantity = 1, bought = false) {
    const PROD_TEMPLATE = $("#prod-template");
    let prodQ = Math.max(prodQuantity, 1);

    const $badge1 = createProductBadge(prodName, prodQuantity);
    const $badge2 = $badge1.clone();
    $badge1.show();
    $("#buy-list").append($badge1);
    $("#bought-list").append($badge2);

    const $prod = PROD_TEMPLATE.clone();
    $prod.find(".first-column").text(prodName);
    $prod.find(".second-column > span").text(prodQ);

    $prod.find(".red-button").click(function () {
        if (prodQ <= 1) return;
        $prod.find(".second-column > span").text(--prodQ);
        $badge1.find(".amount-circle").text(prodQ);
        $badge2.find(".amount-circle").text(prodQ);
    });
    $prod.find(".green-button").click(function () {
        $prod.find(".second-column > span").text(++prodQ);
        $badge1.find(".amount-circle").text(prodQ);
        $badge2.find(".amount-circle").text(prodQ);
    });

    $prod.find("#button-buy").click(function () {
        $prod.find("#plusminus").hide(200, "linear");
        $prod.find("#button-buy").hide(200, "linear");
        $prod.find("#button-delete").hide(200, "linear");
        $prod.find("#unbuy").show(200, "linear");

        $prod.find(".first-column").css("text-decoration-line", "line-through");

        $badge1.hide(300, "linear");
        $badge2.show(300, "linear");
    });
    $prod.find("#unbuy").click(function () {
        $prod.find("#plusminus").show(200, "linear");
        $prod.find("#button-buy").show(200, "linear");
        $prod.find("#button-delete").show(200, "linear");
        $prod.find("#unbuy").hide(200, "linear");

        $prod.find(".first-column").css("text-decoration-line", "none");

        $badge1.show(300, "linear");
        $badge2.hide(300, "linear");
    });
    $prod.find("#button-delete").click(function () {
        $prod.hide(300, "linear");
        $badge1.hide(300, "linear");
        $badge2.hide();
    });

    $prod.find(".second-column > span").text(prodQuantity);

    if (bought) {
        $badge1.hide();
        $badge2.show();
        $prod.find("#button-buy").click();
    }

    return $prod;
}

function createProductBadge(prodName, prodQuantity = 1) {
    const BADGE_TEMPLATE = $("#item-template");
    const prodQ = Math.max(prodQuantity, 1);

    const $badge = BADGE_TEMPLATE.clone();
    $badge.find("span").text(prodName);
    $badge.find(".amount-circle").text(prodQ);
    return $badge;
}

function renderProduct(prodName, prodQuantity = 1, bought = false) {
    if (prodName === "") return;
    const $prod = createProduct(prodName, prodQuantity, bought);
    $('#items-container').append($prod);
    $prod.show(200, "linear");
}