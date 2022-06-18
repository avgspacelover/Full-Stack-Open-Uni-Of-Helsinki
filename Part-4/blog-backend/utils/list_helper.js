const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum =0
  if (blogs.length===0){return 0}
  blogs.map(item => sum +=item.likes)
  return sum
}

const favouriteBlog = (blogs) => {
  let max= -1000000
  let maxObj
  blogs.map(item => {
    if(item.likes>=max){
      max= item.likes
      console.log(max)
    }
  })

  maxObj= blogs.filter(item => item.likes ===max)


  return maxObj[0]
}

const mostBlogs= (blogs) => {
  let library= {}
  // console.log("ji")
  blogs.map(item => {
    console.log(item)

    if(library[item['author']]){
      library[item['author']]++
      console.log(library)
    }else {
      library[item['author']]= 1
      console.log(library)
    }
  })
  let max=-10000
  let maxObj= {}
  Object.keys(library).forEach((item) => {
    // console.log(library[item])
    if(library[item]>max){
      max = library[item]
      maxObj= {
        author: item,
        blogs: library[item]
      }

      // console.log("max",maxObj)
    }
  } )

  // console.log('Max', maxObj)
  return maxObj

}





const mostLikes= (blogs) => {
  let library= {}
  // console.log("ji")
  blogs.map(item => {
    console.log(item)

    if(library[item['author']]){
      library[item['author']]+=item['likes']
      console.log(library)
    }else {
      library[item['author']]= item['likes']
      console.log(library)
    }
  })
  let max=-10000
  let maxObj= {}
  Object.keys(library).forEach((item) => {
    // console.log(library[item])
    if(library[item]>max){
      max = library[item]
      maxObj= {
        author: item,
        likes: library[item]
      }

      // console.log("max",maxObj)
    }
  } )

  // console.log('Max', maxObj)
  return maxObj

}
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}