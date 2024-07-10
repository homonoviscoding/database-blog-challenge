const prisma = require('./db.js')


async function getUsers () {
    const users = await prisma.user.findMany()

    // console.log(users)
}

getUsers()

async function getPostsByIdTwo () {
    const posts = await prisma.post.findMany({
        where: {
            userId: 2
        }
    })

    // console.log(posts)
}

getPostsByIdTwo()

async function getUserByIdOneWithProfile () {
    const user = await prisma.user.findUnique({
        where: {
            id: 1
        },
        include: {
            profile: true
        }
    })

    // console.log(user)
}

getUserByIdOneWithProfile()

async function updatePostByIdOne () {
    const updatePost = await prisma.post.update({
        where: {
            id: 1
        },
        data: {
            content: 'This is because prisma always resets it back to a fresh state after using it.'
        }
    })

    // console.log(updatePost)
}

updatePostByIdOne()

async function deletePostByIdThree () {
    const deletePostComments = await prisma.comment.deleteMany({
        where: {
            postId: 3
        }
    })

    const deletePost = await prisma.post.delete({
        where: {
            id: 3
        }
    })

}

deletePostByIdThree()