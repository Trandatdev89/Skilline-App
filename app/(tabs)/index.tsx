import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Menu, Play, Calendar, Users, FileText, Award } from 'lucide-react-native';

const SkillineApp = () => {
    const [activeTab, setActiveTab] = useState('home');

    const logos = ['facebook', 'Google', 'NETFLIX', 'amazon', 'Grab', 'airbnb'];

    const features = [
        {
            icon: '📅',
            title: 'Online Billing, Invoicing, & Contracts',
            description: 'Simple and secure control of your organization\'s financial and legal transactions. Send customized invoices and contracts'
        },
        {
            icon: '👥',
            title: 'Easy Scheduling & Attendance Tracking',
            description: 'Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance'
        }
    ];

    return (
        <ScrollView style={styles.container}>
            {/* Hero Section */}
            <View style={styles.hero}>
                <Text style={styles.heroTitle}>
                    <Text style={styles.heroTitleOrange}>Studying </Text>
                    <Text style={styles.heroTitleNavy}>Online is now much easier</Text>
                </Text>

                <Text style={styles.heroSubtitle}>
                    Skilline is an interesting platform that will teach you in more an interactive way
                </Text>

                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.joinButton}>
                        <Text style={styles.joinButtonText}>Join for free</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.playButton}>
                        <Play color="#49BBBD" size={20} fill="#49BBBD" />
                    </TouchableOpacity>

                    <Text style={styles.watchText}>Watch how{'\n'}it works</Text>
                </View>

                {/* Student Image Section */}
                <View style={styles.imageSection}>
                    <View style={styles.studentImagePlaceholder}>
                        <Text style={styles.imagePlaceholderText}>👩‍🎓</Text>
                    </View>

                    <View style={styles.statsCard}>
                        <Calendar color="#49BBBD" size={20} />
                        <Text style={styles.statsText}>250k</Text>
                        <Text style={styles.statsLabel}>Assisted Student</Text>
                    </View>

                    <View style={styles.congratsCard}>
                        <FileText color="#F48C06" size={16} />
                        <View>
                            <Text style={styles.congratsTitle}>Congratulations</Text>
                            <Text style={styles.congratsText}>Your admission completed</Text>
                        </View>
                    </View>

                    <View style={styles.classCard}>
                        <View style={styles.classCardHeader}>
                            <View style={styles.avatar} />
                            <View>
                                <Text style={styles.classTitle}>User Experience Class</Text>
                                <Text style={styles.classTime}>Today at 12:00 PM</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.joinNowButton}>
                            <Text style={styles.joinNowText}>Join Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Trusted Companies */}
            <View style={styles.trustedSection}>
                <Text style={styles.trustedTitle}>Trusted by 5,000+ Companies Worldwide</Text>

                <View style={styles.logosGrid}>
                    {logos.map((logo, index) => (
                        <View key={index} style={styles.logoItem}>
                            <Text style={styles.logoItemText}>{logo}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Cloud Software Section */}
            <View style={styles.cloudSection}>
                <Text style={styles.sectionTitle}>
                    <Text style={styles.sectionTitleNavy}>All-In-One </Text>
                    <Text style={styles.sectionTitleOrange}>Cloud Software.</Text>
                </Text>

                <Text style={styles.sectionDescription}>
                    Skilline is one powerful online software suite that combines all the tools needed to run a successful school or office.
                </Text>

                <View style={styles.iconPlaceholder}>
                    <Text style={styles.iconPlaceholderText}>📄</Text>
                </View>
            </View>

            {/* Features Section */}
            <View style={styles.featuresSection}>
                {features.map((feature, index) => (
                    <View key={index} style={styles.featureCard}>
                        <View style={styles.featureIcon}>
                            <Text style={styles.featureIconText}>{feature.icon}</Text>
                        </View>
                        <Text style={styles.featureTitle}>{feature.title}</Text>
                        <Text style={styles.featureDescription}>{feature.description}</Text>
                    </View>
                ))}
            </View>

            {/* What is Skilline */}
            <View style={styles.whatSection}>
                <Text style={styles.whatTitle}>
                    <Text style={styles.whatTitleNavy}>What is </Text>
                    <Text style={styles.whatTitleOrange}>Skilline?</Text>
                </Text>

                <Text style={styles.whatDescription}>
                    Skilline is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.
                </Text>

                <View style={styles.instructorButtons}>
                    <TouchableOpacity style={styles.instructorButton}>
                        <Text style={styles.instructorButtonText}>FOR INSTRUCTORS</Text>
                        <Text style={styles.instructorSubtext}>Start a class today</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.instructorButton}>
                        <Text style={styles.instructorButtonText}>FOR STUDENTS</Text>
                        <Text style={styles.instructorSubtext}>Enter access code</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Everything Section */}
            <View style={styles.everythingSection}>
                <View style={styles.orangeDot} />
                <Text style={styles.everythingTitle}>
                    <Text style={styles.everythingTitleNavy}>Everything you can do in a physical classroom, </Text>
                    <Text style={styles.everythingTitleOrange}>you can do with Skilline</Text>
                </Text>

                <Text style={styles.everythingDescription}>
                    Skilline school management software helps traditional and online schools manage scheduling, attendance, payments and virtual classrooms all in one secure cloud-based system.
                </Text>

                <View style={styles.classroomImage}>
                    <Text style={styles.classroomImageText}>🏫 Classroom</Text>
                </View>
            </View>

            {/* Our Features */}
            <View style={styles.ourFeaturesSection}>
                <Text style={styles.ourFeaturesTitle}>Our Features</Text>
                <Text style={styles.ourFeaturesSubtitle}>
                    This very extraordinary feature, can make learning activities more efficient
                </Text>

                <View style={styles.userInterfaceSection}>
                    <Text style={styles.userInterfaceTitle}>
                        <Text style={styles.userInterfaceA}>A </Text>
                        <Text style={styles.userInterfaceOrange}>user interface </Text>
                        <Text style={styles.userInterfaceNavy}>designed for the classroom</Text>
                    </Text>

                    <View style={styles.userInterfacePoints}>
                        <Text style={styles.pointText}>
                            Teachers dont get lost in the grid view and have a dedicated Podium space.
                        </Text>
                        <Text style={styles.pointText}>
                            TAs and presenters can be moved to the front of the class.
                        </Text>
                        <Text style={styles.pointText}>
                            Teachers can easily see all students and class data at one time.
                        </Text>
                    </View>

                    {/* Video Conference Interface Mockup */}
                    <View style={styles.videoConferenceContainer}>
                        <View style={styles.videoWindow}>
                            <View style={styles.videoControls}>
                                <View style={[styles.controlDot, { backgroundColor: '#FF5F57' }]} />
                                <View style={[styles.controlDot, { backgroundColor: '#FFBD2E' }]} />
                                <View style={[styles.controlDot, { backgroundColor: '#28CA42' }]} />
                            </View>

                            <View style={styles.videoGrid}>
                                {/* Main Presenter */}
                                <View style={styles.mainVideo}>
                                    <View style={styles.videoPlaceholder}>
                                        <Text style={styles.videoEmoji}>👩‍🏫</Text>
                                    </View>
                                    <View style={styles.presenterBadge}>
                                        <Text style={styles.presenterBadgeText}>Present</Text>
                                    </View>
                                    <TouchableOpacity style={styles.callButton}>
                                        <Text style={styles.callButtonText}>📞 Call</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Small Videos */}
                                <View style={styles.smallVideosGrid}>
                                    <View style={styles.smallVideo}>
                                        <Text style={styles.videoEmoji}>👨‍💼</Text>
                                    </View>
                                    <View style={styles.smallVideo}>
                                        <Text style={styles.videoEmoji}>👨‍🎓</Text>
                                        <View style={styles.handRaisedIcon}>
                                            <Text>✋</Text>
                                        </View>
                                    </View>
                                    <View style={styles.smallVideo}>
                                        <Text style={styles.videoEmoji}>👩‍💼</Text>
                                        <View style={styles.inMeetingBadge}>
                                            <Text style={styles.inMeetingText}>In Meeting</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Latest News Section */}
            <View style={styles.newsSection}>
                <Text style={styles.newsTitle}>Lastest News and Resources</Text>
                <Text style={styles.newsSubtitle}>
                    See the developments that have occurred to Skillines in the world
                </Text>

                <View style={styles.newsCard}>
                    <View style={styles.newsImageContainer}>
                        <View style={styles.newsImage}>
                            <Text style={styles.newsImageText}>💻</Text>
                        </View>
                        <View style={styles.newsBadge}>
                            <Text style={styles.newsBadgeText}>NEWS</Text>
                        </View>
                    </View>

                    <Text style={styles.newsCardTitle}>
                        Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution
                    </Text>
                    <Text style={styles.newsCardDescription}>
                        Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...
                    </Text>
                    <TouchableOpacity>
                        <Text style={styles.readMoreText}>Read more...</Text>
                    </TouchableOpacity>
                </View>

                {/* Additional News Items */}
                {[1, 2, 3].map((item, index) => (
                    <View key={index} style={styles.newsListItem}>
                        <View style={styles.newsListImageContainer}>
                            <View style={styles.newsListImage}>
                                <Text style={styles.newsImageText}>💻</Text>
                            </View>
                            <View style={styles.newsListBadge}>
                                <Text style={styles.newsBadgeText}>NEWS</Text>
                            </View>
                        </View>
                        <View style={styles.newsListContent}>
                            <Text style={styles.newsListTitle}>
                                Class Technologies Inc. Closes $30 Million Series A Financing to Meet High Demand
                            </Text>
                            <Text style={styles.newsListDescription}>
                                Class Technologies Inc., the company that created Class,...
                            </Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* Footer Spacing */}
            <View style={styles.footer} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF5EB',
    },
    hero: {
        padding: 20,
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        lineHeight: 40,
    },
    heroTitleOrange: {
        color: '#F48C06',
    },
    heroTitleNavy: {
        color: '#2B3F6C',
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#64748b',
        marginBottom: 30,
        lineHeight: 24,
    },
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    joinButton: {
        backgroundColor: '#F48C06',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
        marginRight: 15,
    },
    joinButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    playButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    watchText: {
        fontSize: 12,
        color: '#2B3F6C',
    },
    imageSection: {
        position: 'relative',
        marginTop: 20,
    },
    studentImagePlaceholder: {
        width: '100%',
        height: 400,
        backgroundColor: '#FFF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholderText: {
        fontSize: 80,
    },
    statsCard: {
        position: 'absolute',
        left: 20,
        top: 20,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    statsText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2B3F6C',
        marginTop: 5,
    },
    statsLabel: {
        fontSize: 12,
        color: '#64748b',
    },
    congratsCard: {
        position: 'absolute',
        right: 20,
        top: 100,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    congratsTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#2B3F6C',
        marginLeft: 10,
    },
    congratsText: {
        fontSize: 10,
        color: '#64748b',
        marginLeft: 10,
    },
    classCard: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    classCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E2E8F0',
        marginRight: 10,
    },
    classTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2B3F6C',
    },
    classTime: {
        fontSize: 12,
        color: '#64748b',
    },
    joinNowButton: {
        backgroundColor: '#EC5A9C',
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    joinNowText: {
        color: 'white',
        fontWeight: '600',
    },
    trustedSection: {
        padding: 20,
        backgroundColor: 'white',
        marginTop: 20,
    },
    trustedTitle: {
        fontSize: 18,
        color: '#64748b',
        textAlign: 'center',
        marginBottom: 30,
    },
    logosGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    logoItem: {
        width: '30%',
        padding: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    logoItemText: {
        fontSize: 14,
        color: '#94A3B8',
        fontWeight: '500',
    },
    cloudSection: {
        padding: 20,
        backgroundColor: '#FFF5EB',
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    sectionTitleNavy: {
        color: '#2B3F6C',
    },
    sectionTitleOrange: {
        color: '#F48C06',
    },
    sectionDescription: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 30,
    },
    iconPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: '#F48C06',
        borderRadius: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconPlaceholderText: {
        fontSize: 40,
    },
    featuresSection: {
        padding: 20,
    },
    featureCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    featureIcon: {
        width: 60,
        height: 60,
        backgroundColor: '#F48C06',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    featureIconText: {
        fontSize: 30,
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2B3F6C',
        marginBottom: 10,
    },
    featureDescription: {
        fontSize: 14,
        color: '#64748b',
        lineHeight: 22,
    },
    whatSection: {
        padding: 20,
        backgroundColor: 'white',
    },
    whatTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    whatTitleNavy: {
        color: '#2B3F6C',
    },
    whatTitleOrange: {
        color: '#F48C06',
    },
    whatDescription: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 30,
    },
    instructorButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    instructorButton: {
        width: '48%',
        backgroundColor: '#2B3F6C',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    instructorButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    instructorSubtext: {
        color: '#94A3B8',
        fontSize: 11,
    },
    everythingSection: {
        padding: 20,
        backgroundColor: '#FFF5EB',
    },
    orangeDot: {
        width: 12,
        height: 12,
        backgroundColor: '#F48C06',
        borderRadius: 6,
        marginBottom: 15,
    },
    everythingTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        lineHeight: 32,
    },
    everythingTitleNavy: {
        color: '#2B3F6C',
    },
    everythingTitleOrange: {
        color: '#F48C06',
    },
    everythingDescription: {
        fontSize: 16,
        color: '#64748b',
        lineHeight: 24,
        marginBottom: 30,
    },
    classroomImage: {
        width: '100%',
        height: 200,
        backgroundColor: '#E2E8F0',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    classroomImageText: {
        fontSize: 24,
    },
    ourFeaturesSection: {
        padding: 20,
        backgroundColor: 'white',
    },
    ourFeaturesTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2B3F6C',
        textAlign: 'center',
        marginBottom: 15,
    },
    ourFeaturesSubtitle: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
        marginBottom: 30,
    },
    userInterfaceSection: {
        marginTop: 20,
    },
    userInterfaceTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        lineHeight: 32,
    },
    userInterfaceA: {
        color: '#2B3F6C',
    },
    userInterfaceOrange: {
        color: '#F48C06',
    },
    userInterfaceNavy: {
        color: '#2B3F6C',
    },
    userInterfacePoints: {
        marginTop: 15,
    },
    pointText: {
        fontSize: 15,
        color: '#64748b',
        lineHeight: 24,
        marginBottom: 12,
    },
    videoConferenceContainer: {
        marginTop: 30,
    },
    videoWindow: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    videoControls: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    controlDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    videoGrid: {
        flexDirection: 'row',
    },
    mainVideo: {
        flex: 2,
        marginRight: 10,
    },
    videoPlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: '#E2E8F0',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    videoEmoji: {
        fontSize: 50,
    },
    presenterBadge: {
        position: 'absolute',
        bottom: 60,
        left: 10,
        backgroundColor: '#3B82F6',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 15,
    },
    presenterBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    callButton: {
        backgroundColor: '#EC5A9C',
        paddingVertical: 8,
        borderRadius: 20,
        alignItems: 'center',
    },
    callButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    smallVideosGrid: {
        flex: 1,
    },
    smallVideo: {
        height: 60,
        backgroundColor: '#E2E8F0',
        borderRadius: 8,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    handRaisedIcon: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#FCD34D',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inMeetingBadge: {
        position: 'absolute',
        bottom: 5,
        left: 5,
        right: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingVertical: 2,
        borderRadius: 5,
    },
    inMeetingText: {
        color: 'white',
        fontSize: 8,
        textAlign: 'center',
    },
    newsSection: {
        padding: 20,
        backgroundColor: '#FFF5EB',
    },
    newsTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2B3F6C',
        marginBottom: 10,
    },
    newsSubtitle: {
        fontSize: 16,
        color: '#64748b',
        marginBottom: 30,
        lineHeight: 24,
    },
    newsCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    newsImageContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    newsImage: {
        width: '100%',
        height: 180,
        backgroundColor: '#E2E8F0',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    newsImageText: {
        fontSize: 60,
    },
    newsBadge: {
        position: 'absolute',
        bottom: 15,
        left: 15,
        backgroundColor: '#F48C06',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 15,
    },
    newsBadgeText: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold',
    },
    newsCardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2B3F6C',
        marginBottom: 10,
        lineHeight: 26,
    },
    newsCardDescription: {
        fontSize: 14,
        color: '#64748b',
        lineHeight: 22,
        marginBottom: 10,
    },
    readMoreText: {
        fontSize: 14,
        color: '#2B3F6C',
        fontWeight: '600',
    },
    newsListItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    newsListImageContainer: {
        position: 'relative',
        marginRight: 15,
    },
    newsListImage: {
        width: 100,
        height: 100,
        backgroundColor: '#E2E8F0',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    newsListBadge: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        backgroundColor: '#F48C06',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 10,
    },
    newsListContent: {
        flex: 1,
        justifyContent: 'center',
    },
    newsListTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2B3F6C',
        marginBottom: 8,
        lineHeight: 20,
    },
    newsListDescription: {
        fontSize: 12,
        color: '#64748b',
        lineHeight: 18,
    },
    footer: {
        height: 30,
    },
});

export default SkillineApp;