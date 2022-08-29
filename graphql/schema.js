const Project = require('../models/Project');

const {
    GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLID,
    GraphQLNonNull,
} = require('graphql');

//Project Type
const ProjectType = new GraphQLObjectType({
	name: 'Project',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
        description: {type: GraphQLString}
	}),
});

// queries
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parent, args) {
				return Project.find();
			},
		},
        project: {
            type: ProjectType,
            args: {id: {type: GraphQLID }},
            resolve(parent, args){
                return Project.findById(args.id)
            }
        }
	},
});

// mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // add project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                description: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description
                })
                return project.save()
            }
        },
        // delete project
        deleteProject: {
            type: ProjectType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                return Project.findByIdAndRemove(args.id)
            }
        }
    }
})


module.exports = new GraphQLSchema({
	query: RootQuery,
    mutation
});
