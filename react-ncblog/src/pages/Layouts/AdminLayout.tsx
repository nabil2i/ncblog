import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import AdminNavBar from "../../components/admin/AdminNavBar";
import AdminSideBar from "../../components/admin/AdminSideBar";
import AuthProvider from "../../components/navigationbar/AuthProvider";

const AdminLayout = () => {
  // const [userData, dispatch] = useReducer(authReducer, {});

  return (
    <AuthProvider>
      <Grid
        templateColumns="repeat(6, 1fr)"
        // bg="gray.50"
      >
        <GridItem
          as="aside"
          colSpan={{ base: 6, lg: 2, xl: 1 }}
          backgroundColor="purple.600"
          minHeight="100vh"
          p="30px"
        >
          <AdminSideBar />
        </GridItem>

        <GridItem
          as="main"
          colSpan={{ base: 6, lg: 4, xl: 5 }}
          py="10px"
          px="40px"
        > Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates amet adipisci quisquam rem, nisi iste aut cum ad culpa voluptate voluptas beatae in ipsam molestias cumque quaerat dicta ab temporibus, eaque illo consequatur. Accusantium, temporibus optio! Blanditiis eaque quod nesciunt obcaecati, rerum adipisci suscipit earum! Earum, harum maiores vitae magnam, illum dolore corporis non vel soluta qui nam laboriosam accusamus ratione obcaecati! Molestias rerum aliquam numquam est, a quae placeat dolorem animi error sit? Beatae, sapiente magni provident vero delectus aspernatur at, dolore cum optio sint facilis harum deleniti? Voluptatum vero placeat corporis. Rerum ea architecto iure doloribus deserunt aliquam obcaecati iusto. Tempora asperiores provident quae laudantium facere? Id ea deserunt natus culpa cumque consequatur molestias alias, laudantium accusamus ratione inventore? Maxime, minima dolor dolores quis, debitis voluptatibus voluptates quia eum deserunt incidunt officia totam culpa. Error labore ducimus nam cupiditate aperiam molestias voluptatem! Similique quisquam consequuntur eligendi soluta fugit iusto quod, tempora cumque nisi cupiditate. Modi deleniti amet reiciendis, sint distinctio assumenda qui tempore voluptas optio similique, corrupti enim voluptate numquam, natus iusto itaque. Itaque repellendus corporis consequatur tenetur error, unde iure consequuntur distinctio ipsa maxime, et aliquam odit in similique beatae voluptatem officia sequi incidunt, totam accusantium placeat neque! Ipsum, nihil impedit, laborum voluptatibus in omnis maxime sit beatae quidem accusantium ratione architecto? Praesentium, quidem? Asperiores, nemo quidem expedita aspernatur, explicabo modi inventore fuga quisquam voluptatem voluptates, aut illum nisi doloribus. Id aut eius voluptates quod, molestiae deserunt cupiditate, excepturi aliquid recusandae animi alias quos, voluptatibus soluta reiciendis impedit quidem sed optio! Fugiat id voluptate impedit vel reprehenderit? Facere quibusdam quam, et quod ipsam doloribus? Nulla id sequi sunt sed? Quasi, autem asperiores necessitatibus qui magni ad eligendi esse amet eius velit veritatis, iusto dolores eveniet voluptatem, exercitationem ut! Exercitationem tenetur, libero at nulla repellendus praesentium incidunt atque facere veniam quod temporibus officiis laborum doloribus, recusandae, cum itaque magni rem et accusamus autem vitae? Excepturi, obcaecati vel ipsam ullam odio dolor dolorum? Quidem ad quia eligendi dolor minus iste minima eaque corporis, reprehenderit voluptas dignissimos enim cupiditate, inventore laboriosam aspernatur modi eveniet libero ea cumque, itaque unde. Molestias temporibus odit distinctio assumenda sapiente perferendis impedit vitae commodi aspernatur veritatis quos ea amet eius, at, hic, provident omnis repudiandae nemo veniam officiis dolorem ducimus! Illum, magnam. Officia nisi, dolorem consequatur aut amet, saepe at hic vero perferendis odio voluptas? Vero doloribus cumque officiis autem ab! Sit, nobis corrupti quidem quia, eligendi accusamus temporibus placeat perferendis suscipit odit minus fugiat qui sint inventore? Sint itaque magnam maiores quas totam laudantium voluptas? Cumque sit ducimus in tenetur nihil quas fugit dicta dolorem? Iure ullam, quae, quas expedita doloribus nemo autem explicabo magnam et, eos eaque quis corporis pariatur ducimus voluptatem fuga incidunt aliquid eveniet accusantium. Accusantium ducimus corrupti nemo. Hic reiciendis deserunt, voluptatum velit voluptas ratione earum qui est ut recusandae nobis! Nihil nemo sapiente, fugiat cupiditate, deserunt porro quidem ipsa optio id inventore nulla. Fugit molestiae odit quidem delectus, ullam cumque voluptate veritatis necessitatibus sunt inventore voluptates ex? Minima adipisci, est quo maxime sunt, at dolor quidem quia obcaecati voluptate ratione, iusto dolore animi voluptatem deleniti iure expedita delectus. Cum dicta ad molestiae? Nesciunt voluptatum ab modi dicta sapiente magni, consectetur nisi odit asperiores qui quos reiciendis harum minus obcaecati accusamus impedit possimus, necessitatibus reprehenderit corrupti, unde molestiae labore deserunt. Ut deleniti dolorem consectetur, sit esse tempora quas nobis beatae quaerat fugit perferendis iusto voluptate atque saepe enim maiores. Laudantium enim quasi vel vitae beatae velit magnam, eaque corporis voluptatum mollitia dolores animi unde, obcaecati vero quo ab sed, sunt commodi aliquid praesentium! Et ipsa, cumque facere eius id laborum?
          <AdminNavBar />
          <Outlet />
        </GridItem>
      </Grid>
    </AuthProvider>
  );
};

export default AdminLayout;
