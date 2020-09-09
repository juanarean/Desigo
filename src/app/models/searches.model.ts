export class RespBusqueda {
    Total: number;
    Page: number;
    Size: number;
    Nodes: [{
        Name: string;
        ObjectId: string
    }];
    _links: []
}

export class ValorPresente {
    Value : {
        Value: number;
        QualityGood: boolean;
    }
    ErrorCode: number
}

export class TrendInfo {
    ObjectId: string;
    PropertyName: string;
    TrendseriesId: string
}

export class TrendValues {
    Id: string;
    Series: {
        QualityGood: string;
        Timestamp: string;
        Value: string;
    } []
}
