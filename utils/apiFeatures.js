
class APIFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
        
       
    }

    filter(){
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        const queryObj = {...this.queryStr};
        const excludedFields = ['page','sort','limit','fields'];
        excludedFields.forEach(el => delete queryObj[el]);
    
        //2)Advanced Filtering
        this.queryStr = JSON.stringify(queryObj);
        this.queryStr=this.queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
        
        this.query = this.query.find(JSON.parse(this.queryStr));
        
        // let query = Tour.find(JSON.parse(queryStr));
        return this;
    }

    sort(){
        if(this.queryStr.sort){
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }else{
            this.query=this.query.sort('-createdAt');
        }

        return this;
    }
    
    limit(){
        if(this.queryStr.fields){
            const fields = this.queryStr.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }else{
            this.query = this.query.select('-__v');
        }

        return this;
    }

    pagination(){
        const page = +this.queryStr.page ||1;
        const limit = +this.queryStr.limit || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);


        return this;
    }

}
module.exports=APIFeatures;