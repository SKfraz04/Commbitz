import blog from "../../../assets/images/blog.png"
import user from "../../../assets/images/user.png"

interface BlogBannerProps {
  styles: any;
}
const BlogBanner: React.FC<BlogBannerProps> = ({ styles }) => {
  return (
    <div className={styles.blogBannre}>
      <div className='container'>
        <div className={styles.blogBannreimage}>
          <img src={blog} alt="" />
          <div className={styles.bogText}>
            <span>Featured</span>
            <h3>Explore the Beauty of The World </h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 🥳️ 🥳️ 🥳️ 🥳️.</p>
            <div className={styles.usersBlog}>
              <h5> <img src={user} alt="" />Tracey Wilson <label>August 20, 2022</label></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogBanner