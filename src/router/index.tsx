import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  // AUTH
  // {
  //   path: '/',
  //   element: <Root />,
  //   children: [
  //     { index: true, element: <ClientSelector /> },
  //     {
  //       path: '/client',
  //       children: [
  //         { index: true, element: <ClientSelector /> },
  //         {
  //           path: ':workspaceId',
  //           element: <Client />,
  //           errorElement: <Error />,
  //           children: [
  //             {
  //               path: ':projectId',
  //               children: [
  //                 { index: true, element: <Tasks /> },
  //                 {
  //                   path: 'task',
  //                   element: <Tasks />
  //                 },
  //                 {
  //                   path: 'task/editor',
  //                   element: <TaskEditor />
  //                 },
  //                 {
  //                   path: 'task/editor/:taskId',
  //                   element: <TaskEditor />
  //                 }
  //               ]
  //             },
  //             // SETTINGS
  //             {
  //               path: 'app-settings',
  //               element: <Settings />
  //             },
  //             {
  //               path: 'personal-settings',
  //               element: <PersonalSettings />
  //             },
  //             {
  //               path: 'workspace-settings',
  //               element: <WorkspaceSettings />
  //             },
  //             // Participants
  //             {
  //               path: 'participants',
  //               element: <Participants />
  //             },
  //             // SHOP
  //             {
  //               path: 'shop',
  //               element: <Shop />
  //             },
  //             {
  //               path: 'shop/editor',
  //               element: <ShopItemEditor />
  //             },
  //             {
  //               path: 'shop/editor/:shopItemId',
  //               element: <ShopItemEditor />
  //             },
  //             {
  //               path: 'purchase-history',
  //               element: <PurchaseHistory />
  //             },
  //             // PROFILE
  //             {
  //               path: 'profile',
  //               element: <Profile />
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // }
]);

export default router;
