const dummy = (blogs) => {
    return 1;
  }

const totalLikes = (blogs) => {
    let sum =0;
    if (blogs.length==0){return 0}
    blogs.map(item => sum +=item.likes);
    return sum;
}
  
const favouriteBlog = (blogs) => {
    let max= -1000000;
    let maxObj;
    blogs.map(item => {
        if(item.likes>=max){
            max= item.likes
            console.log(max)
        } 
    })

    maxObj= blogs.filter(item => item.likes ==max)


    return maxObj[0];
}

// const blogs4 = [
//     {
//       _id: "5a422a851b54a676234d17f7",
//       title: "React patterns",
//       author: "Michael Chan",
//       url: "https://reactpatterns.com/",
//       likes: 7,
//       __v: 0
//     },
//     {
//       _id: "5a422aa71b54a676234d17f8",
//       title: "Go To Statement Considered Harmful",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//       likes: 5,
//       __v: 0
//     },
//     {
//       _id: "5a422b3a1b54a676234d17f9",
//       title: "Canonical string reduction",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//       likes: 12,
//       __v: 0
//     },
//     {
//       _id: "5a422b891b54a676234d17fa",
//       title: "First class tests",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//       likes: 10,
//       __v: 0
//     },
//     {
//       _id: "5a422ba71b54a676234d17fb",
//       title: "TDD harms architecture",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//       likes: 0,
//       __v: 0
//     },
//     {
//       _id: "5a422bc61b54a676234d17fc",
//       title: "Type wars",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//       likes: 2,
//       __v: 0
//     }  
//   ]
// const mostBlogs= (blogs4) => {
//     let library= {};
//     let blogs = blogs4
//     blogs.map(item => {
//         console.log(item)

//         if(library[item["author"]]){
//             library[item["author"]]++
//             console.log(library)
//         }else {
//             library[item["author"]]= 1
//             console.log(library)
//         }
//     })
//     let max=-10000;
//     let maxObj= {};
//     Object.keys(library).map((item) =>{
//         console.log(item)
//         if(blogs[item]>max){
//             max = blogs[item]
//             maxObj= {
//                 author: item,
//                 blogs: blogs[item]
//             }
//             console.log("max",maxObj)
//         }
//     } )
    

//     return maxObj;

// }

// console.log(mostBlogs)



const mostLikes = (blogs) => {
    let max= -1000000;
    let maxObj;
    blogs.map(item => {
        if(item.likes>=max){
            max= item.likes
            console.log(max)
        } 
    })

    return max;
}
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    //mostBlogs
  }