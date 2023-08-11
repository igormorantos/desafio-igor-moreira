/*class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        return "";
    }

}*/

class CaixaDaLanchonete {
    constructor() {
        this.CARDAPIO = [
            { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
            { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
            { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
            { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
            { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
            { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
        ];

        this.FORMAS_DE_PAGAMENTO = ['dinheiro', 'debito', 'credito'];
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.FORMAS_DE_PAGAMENTO.includes(metodoDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let total = 0;
        const carrinho = {};

        for (const item of itens) {
            const [codigo, quantidade, extraDe] = item.split(',');

            const menu_item = this.CARDAPIO.find(menu => menu.codigo === codigo);
            if (!menu_item) {
                return 'Item inválido!';
            }

            if (!carrinho[codigo]) {
                carrinho[codigo] = { quantidade: 0, extra: false };
            }

            carrinho[codigo].quantidade += parseInt(quantidade);

            if (extraDe) {
                carrinho[codigo].extra = true;
                carrinho[extraDe] = { quantidade: 1, extra: false };
            }


        }

        for (const itemCodigo in carrinho) {
            const itemInfo = carrinho[itemCodigo];
            const menu_item = this.CARDAPIO.find(menu => menu.codigo === itemCodigo);

            total += menu_item.valor * itemInfo.quantidade;

            if (itemInfo.extra) {
                return 'Item extra não pode ser pedido sem o principal';
            }
        }

        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95; // Desconto de 5% para pagamento em dinheiro
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03; // Acréscimo de 3% para pagamento a crédito
        }


        const valor = 'R$ ' + total.toFixed(2).replace('.', ',');

        if (valor == "R$ 0,00") {
            return "Quantidade inválida!"
        }


        return valor;
    }
}

export { CaixaDaLanchonete };
