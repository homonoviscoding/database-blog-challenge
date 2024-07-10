const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function seed() {

    const usersToCreate = [
        {
            username: 'Alice',
            email: 'alice@smth.com',
            profile: {
                create: {
                    picture: 'picture.uk.com',
                    biography: 'type s**t I`m on!',
                    githubUrl: 'mygithuburl.co.uk'
                }
            }
        },
        {
            username: 'Robert',
            email: 'bob@smth.com',
            profile: {
                create: {
                    picture: 'picture.uk.com',
                    biography: 'type s**t I`m on!',
                    githubUrl: 'mygithuburl.co.uk'
                }
            }
        },
        {
            username: 'will',
            email: 'will@smth.com',
            profile: {
                create: {
                    picture: 'picture.uk.com',
                    biography: 'type s**t I`m on!',
                    githubUrl: 'mygithuburl.co.uk'
                }
            }
        }
    ]

    const createdUsers = []

    for (const user of usersToCreate) {
        const createdUser = await prisma.user.create({
            data: user,
            include: {
                profile: true
            }
        })
        createdUsers.push(createdUser)
        console.log(createdUsers)
    }

    console.log(`${createdUsers.count} users created`, createdUsers);

    // Add your code here

    const CreatedPosts = []
    for (const createdUser of createdUsers) {
        const post1 = await prisma.post.create({
            data: 
                {
                    title: 'Instructions',
                    content: 'Create the Post model and add the minimum fields listed above, Add any other fields you identified while completing the ERD.',
                    picture: 'mypicture.co.uk',
                    isPublished: true,
                    user: {
                        connect: {
                            id: createdUser.id
                        }
                    }
                }
        })
        const post2 = await prisma.post.create({
            data: 
                {
                    title: 'Comment',
                    content: 'Create the Comment model and add the minimum fields listed above.',
                    picture: 'mypicture.co.uk',
                    isPublished: true,
                    user: {
                        connect: {
                            id: createdUser.id
                        }
                    }
                }
        })
        CreatedPosts.push(post1, post2)
        console.log(CreatedPosts)
    }
    
    const createdComments = []
    for (const post1 of CreatedPosts) {

        const comment = await prisma.comment.create({
            data:{
                    content: 'Create the Comment model and add the minimum fields listed above',
                    post: {
                        connect: {
                            id: post1.id
                        }
                    },
                    user: {
                        connect: {
                            id: post1.userId
                        }
                    }
                }
        })
        createdComments.push(comment)
    }



    // Don't edit any of the code below this line
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })