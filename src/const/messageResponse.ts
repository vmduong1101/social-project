export const successResponseMessageHandler = {
    get: ()=> 'Success',
    create: (name?: string)=>  {
        if(!name) return 'Created Successfully'
        const newName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        return `Created ${newName} Successfully`
    },
    update: (name?: string)=>  {
        if(!name) return 'Updated Successfully'
        const newName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        return `Updated ${newName} Successfully`
    },
    delete: (name?: string)=>  {
        if(!name) return 'Deleted Successfully'
        const newName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        return `Deleted ${newName} Successfully`
    }
}