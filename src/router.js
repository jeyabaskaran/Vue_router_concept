import { createRouter, createWebHistory } from 'vue-router';
import TeamList from './components/teams/TeamsList.vue';
import UserList from './components/users/UsersList.vue';
import TeamMember from './components/teams/TeamMembers.vue';
import TheNotFound from './components/nav/TheNotFound.vue';
import TheTeamFooter from './components/teams/TheTeamFooter.vue';
import TheUserFooter from './components/users/UserFooter.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/team-list" }, // redirect to the some other component if invalid path comes
        {
            name: 'team',
            path: '/team-list', components: { default: TeamList, footer: TheTeamFooter }
            , children: [
                { name: 'team-members', path: ':teamId', component: TeamMember, props: true },
            ] // add the name property to easily maintian the code readable and provide flexibility to updatable.
        },
        {
            path: '/user-list',
            components: { default: UserList, footer: TheUserFooter },
            beforeEnter(to, from, next) {
                console.log(to, from, 'before enter');
                next();
            }
        },
        /*{ path: '/team-list/:teamId', component: TeamMember, props: true }, 
        it is the child of the teamlist component*/

        { path: '/:notFound(.*)', component: TheNotFound }
        /*(.*) indicates the regular expression to if any invalid or irregular characters are come 
        after the domain  it's navigate to the not found component page.*/
    ],
    linkActiveClass: 'active',
    scrollBehavior(to, from, position) { // controlling the scroll behaviour
        if (position) {
            return position;
        }
        return { left: 0, top: 0 }
    }
});

router.beforeEach((to, from, next) => {
    console.log(to, from, 'router before each');
    next();
    // if (to.name == 'team-members') {
    //     next();
    // } else {
    //     console.log('income');
    //     next({ name: 'team-members', params: { teamId: 't2' } });
    // }
});

router.afterEach((to,from,next)=>{
console.log(to,from,'after each');
next();
});

export default router;
