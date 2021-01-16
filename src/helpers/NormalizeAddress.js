const normalizeAddress = (entity) => {
	const address = entity.DomicilioFiscal  ? entity.DomicilioFiscal : entity.Domicilio ? entity.Domicilio : false;
	return address ? {
    	line1 : [address.calle, address.noExterior, address.noInterior].join(' '),
    	line2 : address.colonia,
    	line3 : address.codigoPostal+' '+address.municipio+', '+address.estado,
    	query: encodeURI([address.calle, address.noExterior, address.codigoPostal, address.municipio, address.estado].join(' '))
    } : false;
}

export default normalizeAddress;