export default function (Leke) {
    return {
    // 预习
        prepareclass: [],

        // 学习报告
        studyreport: [
            {
                roleId: 100,
                menus: [
                    {
                        key: "作业成绩报告",
                        url:
              "https://webapp.leke.cn/study-report/pc/student/studyReport.html#/",
                    },
                    {
                        key: "行为分析报告",
                        url:
              "https://webapp.leke.cn/study-report/pc/student/studyReport.html#/behavior",
                    },
                ],
            },
            {
                roleId: 102,
                menus: [
                    {
                        key: "综合分析报告",
                        url:
              "https://diag.leke.cn/auth/common/report/tchanaly/klass-score-inDevelopment.htm?spm=102028",
                    },
                    {
                        key: "学科分析报告",
                        url:
              "https://diag.leke.cn/auth/common/report/tchanaly/klass-score-inDevelopment.htm?spm=102029",
                    },
                    {
                        key: "行为分析报告",
                        url:
              "https://diag.leke.cn/auth/common/report/tchanaly/klass-score-inDevelopment.htm?spm=102030",
                    },
                ],
            },
        ],

        // 复习
        review: [],

        // 微课通
        microclassthrough: [],

        // 提分王
        brushquestionking: [],

        // 备课
        preparelessons: [
            {
                roleId: 101,
                menus: [
                    {
                        key: "章节备课",
                        url:
              "https://beike.leke.cn/auth/teacher/pc/beikepkg/section/list.htm",
                    },
                    {
                        key: "自定义备课",
                        url:
              "https://beike.leke.cn/auth/teacher/pc/beikepkg/custom/list.htm",
                    },
                ],
            },
        ],

        // 考试
        testicon: [
            {
                roleId: 100,
                menus: [
                    {
                        key: "考试列表",
                        url: "https://webapp.leke.cn/exam-web-pc/index.html",
                    },
                    {
                        key: "成绩单",
                        url:
              "https://diag.leke.cn/auth/student/examReport/toShowExamReport.htm",
                    },
                ],
            },
            {
                roleId: 101,
                menus: [
                    {
                        key: "考试列表",
                        url: "https://webapp.leke.cn/exam-web-pc/index.html",
                    },
                    {
                        key: "分析报告",
                        url: "https://diag.leke.cn/auth/teacher/exam/examAnaReportList.htm",
                    },
                    {
                        key: "成绩单",
                        url:
              "https://diag.leke.cn/auth/teacher/examReport/toShowExamReport.htm",
                    },
                ],
            },
            {
                roleId: 102,
                menus: [
                    {
                        key: "考试列表",
                        url: "https://webapp.leke.cn/exam-web-pc/index.html",
                    },
                    {
                        key: "成绩单",
                        url:
              "https://diag.leke.cn/auth/parent/examReport/toShowExamReport.htm",
                    },
                ],
            },
            {
                roleId: 103,
                menus: [
                    {
                        key: "考试列表",
                        url: "https://webapp.leke.cn/exam-web-pc/index.html",
                    },
                    {
                        key: "成绩单",
                        url:
              "https://diag.leke.cn/auth/classTeacher/examReport/toShowExamReport.htm",
                    },
                ],
            },
            {
                roleId: 104,
                menus: [
                    {
                        key: "考试列表",
                        url: "https://webapp.leke.cn/exam-web-pc/index.html",
                    },
                    {
                        key: "分析报告",
                        url: "https://diag.leke.cn/auth/provost/exam/examAnaReportList.htm",
                    },
                    {
                        key: "成绩单",
                        url:
              "https://diag.leke.cn/auth/provost/examReport/toShowExamReport.htm",
                    },
                    {
                        key: "区域联考",
                        url: "https://webapp.leke.cn/exam-web-pc/area.html",
                    },
                ],
            },
            {
                roleId: 105,
                menus: [
                    {
                        key: "考试列表",
                        url: "https://webapp.leke.cn/exam-web-pc/index.html",
                    },
                    {
                        key: "分析报告",
                        url: "https://diag.leke.cn/auth/provost/exam/examAnaReportList.htm",
                    },
                    {
                        key: "成绩单",
                        url:
              "https://diag.leke.cn/auth/provost/examReport/toShowExamReport.htm",
                    },
                ],
            },
            {
                roleId: 120,
                menus: [
                    {
                        key: "考试列表",
                        url: "https://webapp.leke.cn/exam-web-pc/index.html",
                    },
                ],
            },
            {
                roleId: 121,
                menus: [
                    {
                        key: "考试列表",
                        url: "https://webapp.leke.cn/exam-web-pc/index.html",
                    },
                ],
            },
        ],

        // 作业
        homework: [
            {
                roleId: 100,
                menus: [
                    {
                        key: "作业管理",
                        url:
              "https://homework.leke.cn/auth/student/exercise/homework/myHomework.htm?ord=2",
                    },
                    {
                        key: "寒暑假作业",
                        url:
              "https://homework.leke.cn/auth/student/homework/vacationHomeworkList.htm",
                    },
                    {
                        key: "批改任务",
                        url:
              "https://homework.leke.cn/auth/student/homework/correctHomeworkList.htm",
                        data:
              "https://homework.leke.cn/auth/student/homework/getStuHwDoingCorrectTotal.htm?studentId=" +
              Leke.user.userId,
                    },
                ],
            },
            {
                roleId: 101,
                menus: [
                    {
                        key: "作业管理",
                        url:
              "https://homework.leke.cn/auth/teacher/homework/homeworkList.htm",
                    },
                    {
                        key: "寒暑假作业",
                        url:
              "https://homework.leke.cn/auth/teacher/homework/vacationHomeworkList.htm",
                    },
                    {
                        key: "口语中心",
                        url:
              "https://homework.leke.cn/auth/teacher/pc/successAssignedHomworkList.htm",
                    },
                ],

                // 乐桃学院
                airclass: [
                    {
                        roleId: 100,
                        menus: [
                            {
                                key: "我的课程",
                                url:
                  "https://course.leke.cn/auth/course/common/lesson/intoStudentCourse.htm",
                            },
                            {
                                key: "选课中心",
                                url:
                  "https://course.leke.cn/auth/student/course/electiveCenter.htm?enterType=1",
                            },
                        ],
                    },
                    {
                        roleId: 101,
                        menus: [
                            {
                                key: "周课表",
                                url:
                  "https://course.leke.cn/auth/course/common/schedule/week/intoWeekSchedule.htm",
                            },
                            {
                                key: "课程管理",
                                url:
                  "https://course.leke.cn/auth/course/common/manage/intoCourseManage.htm",
                            },
                            {
                                key: "点播库",
                                url:
                  "https://resource.leke.cn/auth/cware/common/coursewareList.htm",
                            },
                        ],
                    },
                    {
                        roleId: 102,
                        menus: [
                            {
                                key: "课程列表",
                                url:
                  "https://course.leke.cn/auth/course/common/lesson/intoStudentCourse.htm",
                            },
                            {
                                key: "选课中心",
                                url:
                  "https://course.leke.cn/auth/parent/course/electiveCenter.htm?enterType=1",
                            },
                        ],
                    },
                    {
                        roleId: 103,
                        menus: [
                            {
                                key: "日课表",
                                url:
                  "https://course.leke.cn/auth/course/common/schedule/day/intoDaySchedule.htm",
                            },
                            {
                                key: "选修班级",
                                url:
                  "https://lesson.leke.cn/auth/classTeacher/roster/studentManager.htm",
                            },
                        ],
                    },
                    {
                        roleId: 104,
                        menus: [
                            {
                                key: "日课表",
                                url:
                  "https://course.leke.cn/auth/course/common/schedule/day/intoDaySchedule.htm",
                            },
                            {
                                key: "课程管理",
                                url:
                  "https://course.leke.cn/auth/course/common/manage/intoCourseManage.htm",
                            },
                            {
                                key: "点播库",
                                url:
                  "https://resource.leke.cn/auth/cware/common/coursewareList.htm",
                            },
                        ],
                    },
                    {
                        roleId: 105,
                        menus: [
                            {
                                key: "日课表",
                                url:
                  "https://course.leke.cn/auth/course/common/schedule/day/intoDaySchedule.htm",
                            },
                        ],
                    },
                ],
            },
            {
                roleId: 103,
                menus: [
                    {
                        key: "作业管理",
                        url:
              "https://homework.leke.cn/auth/classTeacher/homework/homeworkList.htm",
                    },
                    {
                        key: "寒暑假作业",
                        url:
              "https://homework.leke.cn/auth/classTeacher/homework/vacationHomeworkList.htm",
                    },
                ],
            },
            {
                roleId: 104,
                menus: [
                    {
                        key: "班级作业",
                        url:
              "https://homework.leke.cn/auth/provost/homework/homeworkList.htm",
                    },
                    {
                        key: "学生作业",
                        url:
              "https://homework.leke.cn/auth/provost/homework/homeworkSubmitStatusDetail.htm",
                    },
                ],
            },
            {
                roleId: 105,
                menus: [
                    {
                        key: "班级作业",
                        url:
              "https://homework.leke.cn/auth/provost/homework/homeworkList.htm",
                    },
                    {
                        key: "作业勤奋报告",
                        url: "https://diag.leke.cn/auth/provost/diligent/teaDiligent.htm",
                    },
                ],
            },
        ],

        // 错题本
        wrongnote: [],

        // 笔记
        noteicon: [],

        // 乐答
        answer: [],

        // 教学诊断
        teachingdiagnosis: [
            {
                roleId: 101,
                menus: [
                    {
                        key: "班级作业分析",
                        url:
              "https://webapp.leke.cn/teaching-diagnosis/pc/classHomework.html",
                    },
                    {
                        key: "班级行为分析",
                        url:
              "https://webapp.leke.cn/teaching-diagnosis/pc/classBehavior.html",
                    },
                    {
                        key: "红花激励统计",
                        url: "https://incentive.leke.cn/auth/teacher/diag/teacherSpace.htm",
                    },
                ],
            },
        ],

        // 办公系统
        officesystem: [],

        // 空中课堂
        airclass: [
            {
                roleId: 100,
                menus: [
                    {
                        key: "我的课程",
                        url:
              "https://course.leke.cn/auth/course/common/lesson/intoStudentCourse.htm",
                    },
                    {
                        key: "选课中心",
                        url:
              "https://course.leke.cn/auth/student/course/electiveCenter.htm?enterType=1",
                    },
                ],
            },
            {
                roleId: 101,
                menus: [
                    {
                        key: "周课表",
                        url:
              "https://course.leke.cn/auth/course/common/schedule/week/intoWeekSchedule.htm",
                    },
                    {
                        key: "课程管理",
                        url:
              "https://course.leke.cn/auth/course/common/manage/intoCourseManage.htm",
                    },
                    {
                        key: "点播库",
                        url:
              "https://resource.leke.cn/auth/cware/common/coursewareList.htm",
                    },
                ],
            },
            {
                roleId: 102,
                menus: [
                    {
                        key: "课程列表",
                        url:
              "https://course.leke.cn/auth/course/common/lesson/intoStudentCourse.htm",
                    },
                    {
                        key: "选课中心",
                        url:
              "https://course.leke.cn/auth/parent/course/electiveCenter.htm?enterType=1",
                    },
                ],
            },
            {
                roleId: 103,
                menus: [
                    {
                        key: "日课表",
                        url:
              "https://course.leke.cn/auth/course/common/schedule/day/intoDaySchedule.htm",
                    },
                    {
                        key: "选修班级",
                        url:
              "https://lesson.leke.cn/auth/classTeacher/roster/studentManager.htm",
                    },
                ],
            },
            {
                roleId: 104,
                menus: [
                    {
                        key: "日课表",
                        url:
              "https://course.leke.cn/auth/course/common/schedule/day/intoDaySchedule.htm",
                    },
                    {
                        key: "课程管理",
                        url:
              "https://course.leke.cn/auth/course/common/manage/intoCourseManage.htm",
                    },
                    {
                        key: "点播库",
                        url:
              "https://resource.leke.cn/auth/cware/common/coursewareList.htm",
                    },
                ],
            },
            {
                roleId: 105,
                menus: [
                    {
                        key: "日课表",
                        url:
              "https://course.leke.cn/auth/course/common/schedule/day/intoDaySchedule.htm",
                    },
                ],
            },
        ],

        // 班务管理
        classmanagement: [
            {
                roleId: 103,
                menus: [
                    {
                        key: "家长管理",
                        url:
              "https://tutor.leke.cn/auth/classTeacher/parentManager/manager.htm",
                    },
                    {
                        key: "用户审核",
                        url: "https://tutor.leke.cn/auth/classTeacher/invitation/list.htm",
                    },
                ],
            },
        ],

        // 财务管理
        financialcontrol: [],

        // 学情监控
        learningtomonitor: [
            {
                roleId: 103,
                menus: [
                    {
                        key: "班级分析",
                        url:
              "https://diag.leke.cn/auth/common/report/tchanaly/klass-score-inDevelopment.htm?spm=103034",
                    },
                    {
                        key: "学科分析",
                        url:
              "https://diag.leke.cn/auth/common/report/tchanaly/klass-score-inDevelopment.htm?spm=103035",
                    },
                    {
                        key: "课堂考勤",
                        url:
              "https://lesson.leke.cn/auth/classTeacher/attendance/enterAttendanceByCourse.htm",
                    },
                    {
                        key: "学生考勤",
                        url:
              "https://lesson.leke.cn/auth/classTeacher/attendance/viewStuAttendStatis.htm",
                    },
                    {
                        key: "旁听考勤",
                        url:
              "https://lesson.leke.cn/auth/classTeacher/attendance/classTeacherAttendances.htm",
                    },
                    {
                        key: "点播进度",
                        url:
              "https://resource.leke.cn/auth/classTeacher/resource/study/stuStatis.htm",
                    },
                    {
                        key: "红花激励",
                        url:
              "https://incentive.leke.cn/auth/teacher/diag/headTeacherSpace.htm",
                    },
                ],
            },
            {
                roleId: 104,
                menus: [
                    {
                        key: "学科优劣分析",
                        url:
              "https://diag.leke.cn/auth/common/report/tchanaly/klass-score-inDevelopment.htm?spm=104018",
                    },
                    {
                        key: "学生行为分析",
                        url:
              "https://diag.leke.cn/auth/provost/studentMonitor/homeworkAnalyse/homeworkAnalysePage.htm",
                    },
                    {
                        key: "学生考勤",
                        url:
              "https://diag.leke.cn/auth/provost/studentMonitor/studentAttend/toShowStudentAttend.htm",
                    },
                    {
                        key: "上课人数统计",
                        url:
              "https://monitor.leke.cn/auth/provost/course/classPeopleTotal.htm",
                    },
                ],
            },
            {
                roleId: 105,
                menus: [
                    {
                        key: "学科优劣分析",
                        url:
              "https://diag.leke.cn/auth/common/report/tchanaly/klass-score-inDevelopment.htm",
                    },
                    {
                        key: "学生行为分析",
                        url:
              "https://diag.leke.cn/auth/provost/studentMonitor/homeworkAnalyse/homeworkAnalysePage.htm",
                    },
                    {
                        key: "学生考勤",
                        url:
              "https://diag.leke.cn/auth/provost/studentMonitor/studentAttend/toShowStudentAttend.htm",
                    },
                    {
                        key: "上课人数统计",
                        url:
              "https://monitor.leke.cn/auth/president/course/classPeopleTotal.htm",
                    },
                ],
            },
        ],

        // 教务管理
        educationaladministration: [
            {
                roleId: 104,
                menus: [
                    {
                        key: "人员管理",
                        url:
              "https://tutor.leke.cn/auth/schoolAdmin/user/struct/struct_list.htm",
                    },
                    {
                        key: "教学班管理",
                        url:
              "https://webapp.leke.cn/lesson-web/index.html#/classesManage/index",
                    },
                    {
                        key: "教材管理",
                        url: "https://user.leke.cn/auth/provost/material/list.htm",
                    },
                    {
                        key: "区域库管理",
                        url: "https://user.leke.cn/auth/provost/league/iJoin.htm",
                    },
                    {
                        key: "一机一账号",
                        url: "https://tutor.leke.cn/auth/schoolAdmin/user/omoa.htm",
                    },
                    {
                        key: "校历设置",
                        url:
              "https://webapp.leke.cn/schoolCalendar-web/index.html#/schoolCalendar",
                        urls: [
                            "https://webapp.leke.cn/schoolCalendar-web/index.html#/schoolCalendar",
                            "https://webapp.leke.cn/schoolCalendar-web/index.html#/calendarDetail",
                        ],
                    },
                ],
            },
        ],

        // 教学监控
        monitoringofteaching: [
            {
                roleId: 104,
                menus: [
                    {
                        key: "教学常规",
                        url:
              "https://diag.leke.cn/auth/provost/teachingMonitor/lessonAttend/toShowLessonAttendRateStat.htm",
                    },
                    {
                        key: "统计总表",
                        url:
              "https://diag.leke.cn/auth/provost/teachingMonitor/statsum/toShowStatSum.htm",
                    },
                ],
            },
            {
                roleId: 105,
                menus: [
                    {
                        key: "教学常规",
                        url:
              "https://diag.leke.cn/auth/provost/teachingMonitor/lessonAttend/toShowLessonAttendRateStat.htm",
                    },
                    {
                        key: "统计总表",
                        url:
              "https://diag.leke.cn/auth/provost/teachingMonitor/statsum/toShowStatSum.htm",
                    },
                ],
            },
        ],

        // 平台管理
        pluponform: [
            {
                roleId: 104,
                menus: [
                    {
                        key: "学校信息",
                        url: "https://tutor.leke.cn/auth/user/school/loadSchoolInfo.htm",
                    },
                    {
                        key: "主页管理",
                        url: "https://tutor.leke.cn/auth/common/occupancy/base.htm",
                    },
                    {
                        key: "平板应用",
                        url: "https://notice.leke.cn/auth/common/lepad/school/appList.htm",
                    },
                    {
                        key: "隐私设置",
                        url: "https://tutor.leke.cn/auth/provost/privacy/settings.htm",
                    },
                ],
            },
        ],

        // 校园课堂
        schoolclass: [],

        // 教师研修
        train: [],

        // 财务管理
        financialstatistics: [
            {
                roleId: 103,
                menus: [
                    {
                        key: "班级订单",
                        url:
              "https://pay.leke.cn/auth/teacher/order/orderListForClassTeacher.htm",
                    },
                ],
            },
            {
                roleId: 104,
                menus: [
                    {
                        key: "财务统计",
                        url:
              "https://pay.leke.cn/auth/platformFinance/statistics/statisticsSchoolDetail.htm",
                    },
                    {
                        key: "账户管理",
                        url:
              "https://pay.leke.cn/auth/provost/virtualCurrency/virtualCurrencyDetail.htm",
                    },
                    {
                        key: "学校订单",
                        url:
              "https://pay.leke.cn/auth/provost/order/orderListForProvost.htm",
                    },
                ],
            },
            {
                roleId: 105,
                menus: [
                    {
                        key: "学校财务统计",
                        url: "https://pay.leke.cn/auth/common/dataStatis/dataMonthView.htm",
                    },
                    {
                        key: "课程财务统计",
                        url:
              "https://pay.leke.cn/auth/common/statis/financeStatisticsListBySchool.htm",
                    },
                    {
                        key: "订单统计",
                        url:
              "https://pay.leke.cn/auth/common/orderStatis/orderStatisView.htm",
                    },
                    {
                        key: "订单查询",
                        url:
              "https://pay.leke.cn/auth/common/order/orderListForFinance.htm",
                    },
                ],
            },
        ],

        // 预习检查
        preparecheck: [],

        // 资源库(个人、区域、学校)
        resource: [
            // TODO:
            // 个人、区域、学校资源分别是三个，并且有额外的标题内容
            // 个人资源库
            // icon : 'c-businesshead__resource',
            // key : 'nav.repo.personal.home',
            // title: '个人资源便捷管理，方便调用！',
            // target : '_blank',
            // url : BK_SVR + '/auth/teacher/courseware/personal/list.htm',
            // spm : SPM_ID + '007'
        ],

        // 主页管理
        homemanage: [],

        // 选课排课
        selectlesson: [
            {
                roleId: 104,
                menus: [
                    {
                        key: "智能排课",
                        url:
              "https://lesson.leke.cn/auth/provost/paike/manage/taskManage.htm",
                    },
                    {
                        key: " 智能分班",
                        url:
              "https://lesson.leke.cn/auth/provost/paike/choiceExam/requiredList.htm",
                    },
                    {
                        key: "课表导入",
                        url: "https://lesson.leke.cn/auth/provost/plan/list.htm",
                    },
                    {
                        key: "选修课选课",
                        url:
              "https://webapp.leke.cn/lesson-web/index.html#/electiveTakeCourse/electiveList",
                    },
                ],
            },
        ],

        // 智慧评价
        evaluation: [
            {
                roleId: 122,
                menus: [
                    {
                        key: "评价报告",
                        url: "https://webapp.leke.cn/evaluation-web/index.html#/",
                    },
                    {
                        key: "评价设置",
                        url:
              "https://webapp.leke.cn/evaluation-web/index.html#/evaluationSet",
                    },
                    {
                        key: "报表导出",
                        url: "https://webapp.leke.cn/evaluation-web/index.html#/export",
                    },
                ],
            },
        ],

        // 老师动态
        teacherDynamics: [
            {
                roleId: 104,
                menus: [
                    {
                        key: "课堂",
                        url:
              "https://webapp.leke.cn/diag-teaching-dynamics/pc/teachDynamics.html#/?statuId=0",
                        urls: [
                            "https://webapp.leke.cn/diag-teaching-dynamics/pc/teachDynamics.html#/?statuId=0",
                            "https://webapp.leke.cn/diag-teaching-dynamics/pc/teachDynamics.html#/?statuId=1",
                            "https://webapp.leke.cn/diag-teaching-dynamics/pc/teachDynamics.html#/?statuId=2",
                            "https://webapp.leke.cn/diag-teaching-dynamics/pc/teachDynamics.html#/?statuId=3",
                            "https://webapp.leke.cn/diag-teaching-dynamics/pc/teachDynamics.html#/?statuId=4",
                        ],
                    },
                    {
                        key: "备课",
                        url:
              "https://webapp.leke.cn/diag-teaching-dynamics/pc/teachDynamics.html#/lessonPreparation",
                    },
                    {
                        key: "作业",
                        url:
              "https://webapp.leke.cn/diag-teaching-dynamics/pc/teachDynamics.html#/homework",
                    },
                    {
                        key: "答疑",
                        url:
              "https://webapp.leke.cn/diag-teaching-dynamics/pc/teachDynamics.html#/question",
                    },
                ],
            },
            {
                roleId: 105,
                menus: [
                    {
                        key: "课堂",
                        url:
              "https://webapp.leke.cn/diag-teaching-dynamics/pc/teachDynamics.html#/?statuId=0",
                        urls: [
                            "https://webapp.leke.cn/diag-teaching-dynamics/pc/teachDynamics.html#/?statuId=0",
                            "https://webapp.leke.cn/diag-teaching-dynamics/pc/teachDynamics.html#/?statuId=1",
                            "https://webapp.leke.cn/diag-teaching-dynamics/pc/teachDynamics.html#/?statuId=2",
                            "https://webapp.leke.cn/diag-teaching-dynamics/pc/teachDynamics.html#/?statuId=3",
                            "https://webapp.leke.cn/diag-teaching-dynamics/pc/teachDynamics.html#/?statuId=4",
                        ],
                    },
                    {
                        key: "备课",
                        url:
              "https://webapp.leke.cn/diag-teaching-dynamics/pc/teachDynamics.html#/lessonPreparation",
                    },
                    {
                        key: "作业",
                        url:
              "https://webapp.leke.cn/diag-teaching-dynamics/pc/teachDynamics.html#/homework",
                    },
                    {
                        key: "答疑",
                        url:
              "https://webapp.leke.cn/diag-teaching-dynamics/pc/teachDynamics.html#/question",
                    },
                ],
            },
        ],

        // 学生动态
        studentDynamics: [
            {
                roleId: 104,
                menus: [
                    {
                        key: "考勤",
                        url:
              "https://webapp.leke.cn/diag-teaching-dynamics/pc/studentDynamics.html#/",
                    },
                    {
                        key: "提问",
                        url:
              "https://webapp.leke.cn/diag-teaching-dynamics/pc/studentDynamics.html#/ask",
                    },
                ],
            },
            {
                roleId: 105,
                menus: [
                    {
                        key: "考勤",
                        url:
              "https://webapp.leke.cn/diag-teaching-dynamics/pc/studentDynamics.html#/",
                    },
                    {
                        key: "提问",
                        url:
              "https://webapp.leke.cn/diag-teaching-dynamics/pc/studentDynamics.html#/ask",
                    },
                ],
            },
        ],
        // 班级分组
        classGroup: [],
    };
}
