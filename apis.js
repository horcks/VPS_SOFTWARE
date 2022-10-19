var tipo
var marca
var modelo
var year
var impuesto

function fill_select_marca(){
    $('#select_marca').empty();
    $("#select_marca").append(`<option >Seleccione...</option>`);
    fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas`)
        .then((response) =>response.json(),)
        .then((item)=>{
        item.map(function(item){
            $("#select_marca").append(`<option value="${item.codigo}">${item.nome}</option>`);
        })
        });
}

function fill_select_modelo(){
    $('#select_modelo').empty();
    $("#select_modelo").append(`<option >Seleccione...</option>`);
    
    fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos`)
        .then((response) =>response.json(),)
        .then((item)=>{
            
            item.modelos.map(function(item){
                $("#select_modelo").append(`<option value="${item.codigo}">${item.nome}</option>`);
            })
        });
}

function fill_select_year(){
    $('#select_year').empty();
    $("#select_year").append(`<option >Seleccione...</option>`);
    
    fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos/${modelo}/anos`)
        .then((response) =>response.json(),)
        .then((item)=>{
            item.map(function(item){
                $("#select_year").append(`<option value="${item.codigo}">${item.nome}</option>`);
            })
        });
}

function get_veicle(){
    var HTMLResponse = document.querySelector("#response");

    fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos/${modelo}/anos/${year}`)    
    .then((response) =>response.json(),)
        .then((item)=>{
            if (item.Combustivel =="Diesel")
                impuesto = 2.5
            else if (item.Combustivel =="Gasolina")
                impuesto = 5
            else 
                impuesto = 1
            
            fetch(`https://api.currencyapi.com/v3/latest?apikey=rfjOpz1FrNmVTwZq7eQjWkrsOx91CDzziO6KhUnb&value=${parseInt(item.Valor.split(" ")[1])}&currencies=COP,USD&base_currency=BRL`)
            .then((response) =>response.json(),)
                .then((tasa)=>{
                    console.log(parseInt(item.Valor.split(" ")[1]))
                    tasa= tasa.data.COP.value
                    let txt =`
                        Marca : ${item.Marca} <br>
                        Modelo : ${item.Modelo}<br>
                        Año : ${item.AnoModelo}<br>
                        Combustible : ${item.Combustivel}<br>
                        Impuesto : ${impuesto}%<br>
                        Valor : ${item.Valor}<br>
                        Valor COP: ${tasa}<br>
                    `
                    HTMLResponse.innerHTML=txt
                })
            
            
            
        });
}

$("#select_tipo").on("change" ,function(){tipo=$(this).val();fill_select_marca()})
$("#select_marca").on("change" ,function(){marca=$(this).val();fill_select_modelo()});
$("#select_modelo").on("change" ,function(){modelo=$(this).val();fill_select_year()});
$("#select_year").on("change" ,function(){year=$(this).val();get_veicle()});