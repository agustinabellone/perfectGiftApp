import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import { Calendar } from 'react-native-calendario'
import theme from 'src/theme'
import moment from 'moment'
import api from 'src/services/apiUsers'
import useApiCall from 'src/hooks/useApiCall'
import auth from '@react-native-firebase/auth'
import AwesomeAlert from 'react-native-awesome-alerts'

const CalendarView = () => {
  //Obtener Datos del Usuario:
  const [data, loading] = useApiCall(
    api.getUserByEmail,
    auth().currentUser.email
  )

  //Obtener el nombre del usuario que cumple años
  const [name, setName] = useState([])

  const getFullName = date => {
    const array = []
    showAlert()
    calendar.map(item => {
      if (item.birthday === date) {
        array.push(item.name)
      }
    })
    setName(array)
  }

  //Alert Información:
  const [alertVisibility, setAlertVisibility] = useState(false)

  const showAlert = () => {
    setAlertVisibility(true)
  }

  const hideAlert = () => {
    setAlertVisibility(false)
  }

  //Estilos:
  const styles = StyleSheet.create({
    container: {
      height: '82%',
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    title: {
      fontSize: 30,
      marginTop: 20,
      textAlign: 'center',
      fontFamily: 'Roboto-Bold',
      height: '10%',
    },
    calendar: {
      height: '90%',
    },
    normalDate: {
      fontFamily: 'Roboto-Medium',
      fontSize: 12,
      color: theme.colors.primary,
    },
    importantDate: {
      color: 'white',
      backgroundColor: theme.colors.green,
      fontFamily: 'Roboto-Bold',
      fontSize: 13,
      width: 20,
      textAlign: 'center',
      borderRadius: 3,
    },
  })

  if (loading || data === null) return null

  //Obtener datos de calendario
  const calendar = data[0].calendar
  const calendarBirthdays = []
  calendar.map(item => {
    calendarBirthdays.push(item.birthday)
  })

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Calendario</Text>
        <View style={styles.calendar}>
          <Calendar
            onChange={date => {
              const completeData = moment(date.startDate, 'DD/MM/YYYY').format(
                'DD/MM'
              )
              calendarBirthdays.includes(completeData)
                ? getFullName(completeData)
                : null
            }}
            locale='es'
            firstDayMonday='true'
            renderDayContent={date => {
              const completeData = moment(date.date, 'DD/MM/YYYY').format(
                'DD/MM'
              )
              const day = moment(date.date, 'DD/MM/YYYY').format('D')
              return (
                <Text
                  style={
                    calendarBirthdays.includes(completeData)
                      ? styles.importantDate
                      : styles.normalDate
                  }>
                  {day}
                </Text>
              )
            }}
            initialListSize
            disableRange
            theme={{
              monthTitleTextStyle: {
                color: '#412954',
                fontFamily: 'Roboto-Medium',
                fontSize: 24,
              },
              weekColumnsContainerStyle: {
                height: 20,
                backgroundColor: theme.colors.secondary,
                marginTop: 3,
                marginBottom: 3,
              },
              weekColumnTextStyle: {
                color: 'white',
                fontSize: 12,
              },
              activeDayContainerStyle: {
                backgroundColor: 'white',
              },
              activeDayTextStyle: {
                color: 'white',
              },
            }}
          />
        </View>
      </View>
      <AwesomeAlert
        titleStyle={{
          color: theme.colors.primary,
          fontSize: 18,
          fontFamily: 'Roboto-Medium',
          textAlign: 'center',
        }}
        messageStyle={{
          color: 'black',
          textAlign: 'center',
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        }}
        show={alertVisibility}
        showProgress={false}
        title='Es el cumpleaños de:'
        message={name.toString()}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText='Ok'
        confirmButtonColor='#0D6115'
        onConfirmPressed={() => {
          hideAlert()
        }}
      />
      <Footer />
    </View>
  )
}

export default CalendarView
