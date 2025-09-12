'use client'

import { motion } from 'framer-motion'
import { Users, Target, Lightbulb, Heart, Award, Globe } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { ProtectedLink } from '@/components/ProtectedLink'

export default function AboutPage() {
  const { t } = useLanguage()
  
  const values = [
    {
      icon: Target,
      title: t('about.ourMission'),
      description: t('about.ourMissionDesc'),
    },
    {
      icon: Lightbulb,
      title: t('about.innovation'),
      description: t('about.innovationDesc'),
    },
    {
      icon: Heart,
      title: t('about.customerFirst'),
      description: t('about.customerFirstDesc'),
    },
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '/team-1.jpg',
      description: 'Visionary leader with 10+ years in e-commerce and AI technology.',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '/team-2.jpg',
      description: 'Tech expert specializing in AI integration and scalable systems.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      image: '/team-3.jpg',
      description: 'Creative director focused on user experience and interface design.',
    },
  ]

  const stats = [
    { icon: Users, label: t('about.happyCustomers'), value: '10,000+' },
    { icon: Award, label: t('about.awardsWon'), value: '15+' },
    { icon: Globe, label: t('about.countriesServed'), value: '25+' },
    { icon: Heart, label: t('about.customerSatisfaction'), value: '98%' },
  ]

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-text-primary mb-6"
            >
              {t('about.title')}{' '}
              <span className="text-gradient">Sijual</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto"
            >
              {t('about.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-green-accent" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-green-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                {t('about.ourStory')}
              </h2>
              <div className="space-y-4 text-text-secondary text-lg leading-relaxed">
                <p>
                  {t('about.ourStoryDesc1')}
                </p>
                <p>
                  {t('about.ourStoryDesc2')}
                </p>
                <p>
                  {t('about.ourStoryDesc3')}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square relative overflow-hidden rounded-xl bg-surface border border-gray-800">
                <Image
                  src="/about-hero.jpg"
                  alt="Our team working together"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
            >
              {t('about.ourValues')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-text-secondary max-w-2xl mx-auto"
            >
              {t('about.ourValuesDesc')}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card text-center group hover:border-green-accent/50 transition-colors"
              >
                <div className="w-16 h-16 bg-green-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-accent/20 transition-colors">
                  <value.icon className="w-8 h-8 text-green-accent" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  {value.title}
                </h3>
                <p className="text-text-muted">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
            >
              {t('about.meetOurTeam')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-text-secondary max-w-2xl mx-auto"
            >
              {t('about.meetOurTeamDesc')}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full bg-surface border border-gray-800 group-hover:border-green-accent/50 transition-colors">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-green-accent font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-text-muted text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-accent to-yellow-accent">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            {t('about.joinOurJourney')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/90 mb-8"
          >
            {t('about.joinOurJourneyDesc')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <ProtectedLink
              href="/shop"
              className="relative overflow-hidden bg-white text-green-accent font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md hover:shadow-white/15 group border-2 border-white"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white to-yellow-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative">{t('about.startShopping')}</span>
            </ProtectedLink>
            <ProtectedLink
              href="/contact"
              className="relative overflow-hidden border-2 border-white text-white hover:text-white hover:scale-105 hover:shadow-md hover:shadow-white/25 font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:border-white hover:bg-white/5"
            >
              <span className="relative">{t('about.getInTouch')}</span>
            </ProtectedLink>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

