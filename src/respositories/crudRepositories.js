export default function crudRepository(schema){
     return {
        model: schema,
        create: async function(data){
            const newDocs = await this.model.create(data);
            return newDocs;
        },
        getAll: async function(){
            const allDocs= await this.model.find();
            return allDocs;
        },
        getById: async function(id){
            const doc = await this.model.findById(id);
            return doc
        },
        delete : async function(id)  {
            const response = await this.model.findByIdAndDelete(id)
            return response;
        },
        update: async function(id, data){
            const updateDoc = await this.model.findByIdAndUpdate(id, data,{new:true})
            return updateDoc
        },
        deleteMany: async function (modelIds) {
       const response = await Channel.deleteMany({
         _id:{
            $in : modelIds
        }
       })

       return response;
    }
     }
}