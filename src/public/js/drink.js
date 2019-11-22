cambio1= ()=>{
	let ingre1 = $('#ingre1').val()	
	let ingre2 = $('#ingre2').val()
	let ingre3 = $('#ingre3').val()
	let sum=ingre2+ingre3
	
	if(ingre1<=(375-sum))
	{
		return true;
	}else
	return false
	
	}
	cambio2= ()=>{
	let ingre1 = $('#ingre1').val(iddrink.toString())	
	let ingre2 = $('#ingre2').val(iddrink.toString())
	let ingre3 = $('#ingre3').val(iddrink.toString())
	let sum=ingre1+ingre3
	
	if(ingre2<=(375-sum))
	{
		return true;
	}else
	return false
	}
	cambio3= ()=>{
	let ingre1 = $('#ingre1').val(iddrink.toString())	
	let ingre2 = $('#ingre2').val(iddrink.toString())
	let ingre3 = $('#ingre3').val(iddrink.toString())
	let sum=ingre1+ingre2
	
	if(ingre3<=(375-sum))
	{
		return true;
	}else
	return false
	}
