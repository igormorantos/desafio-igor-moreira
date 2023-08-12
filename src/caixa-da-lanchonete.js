const cardapioCompleto = {
    cafe: {
        descricao: "Café",
        valor: "R$ 3,00",
    },
    chantily: {
        descricao: "Chantily (extra do Café)",
        valor: "R$ 1,50",
        isExtra: true,
        ref: "cafe"
    },
    suco: {
        descricao: "Suco Natural",
        valor: "R$ 6,20",
    },
    sanduiche: {
        descricao: "Sanduíche",
        valor: "R$ 6,50",
    },
    queijo: {
        descricao: "Queijo (extra do Sanduíche)",
        valor: "R$ 2,00",
        isExtra: true,
        ref: "sanduiche"
    },
    salgado: {
        descricao: "Salgado",
        valor: "R$ 7,25",
    },
    combo1: {
        descricao: "1 Suco e 1 Sanduíche",
        valor: "R$ 9,50",
    },
    combo2: {
        descricao: "1 Café e 1 Sanduíche",
        valor: "R$ 7,50",
    },
};

class CaixaDaLanchonete {
    constructor() { }

    calcularValorDaCompra(metodoPagamento, itens) {
        const metodosPagamento = ["dinheiro", "debito", "credito"];

        if (!metodosPagamento.includes(metodoPagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        const carrinhoDeCompras = itens.map((item) => {
            const [codigo, quantidade] = item.split(",");
            return {
                codigo,
                quantidade: parseInt(quantidade),
            };
        });

        let valorTotal = 0;

        for (const item of carrinhoDeCompras) {
            const { codigo, quantidade } = item;

            const itemDetalhado = cardapioCompleto[codigo];

            if (!itemDetalhado) {
                return "Item inválido!";
            }

            if (quantidade === 0) {
                return "Quantidade inválida!";
            }

            if (itemDetalhado.isExtra) {
                if (!carrinhoDeCompras.some((carrinhoItem) => carrinhoItem.codigo === itemDetalhado.ref)) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }

            const valor = parseFloat(
                itemDetalhado.valor.replace("R$", "").replace(",", ".")
            );
            valorTotal += valor * quantidade;
        }

        const descontos = {
            dinheiro: 0.95,
            credito: 1.03,
        };

        if (descontos[metodoPagamento]) {
            valorTotal *= descontos[metodoPagamento];
        }

        const valorFinal = valorTotal.toFixed(2).replace(".", ",");
        return `R$ ${valorFinal}`;
    }
}

export { CaixaDaLanchonete };