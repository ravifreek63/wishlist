package com.example.wishlist1;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;

import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.util.Log;

public class HttpPost {
	public static String ERROR = "Error.";
	//private static String URL_ADD_WISH = "http://ec2-54-186-87-220.us-west-2.compute.amazonaws.com:3000/mobile/addWish/";
	
	public static abstract class SendableObject {
		public enum HttpType {GET,POST};
		public abstract String toJSON();
		public String url; //The url to which the object should be sent.
		/*protected String kvPair(String key, String value) {
			return "\""+key+"\":\""+value+"\"";
		}*/
		protected HttpType httpType = HttpType.POST;
		public Boolean shouldPost() {
			return httpType == HttpType.POST;
		}
		public void setConnectionProperties(HttpURLConnection conn) {
			conn.setRequestProperty("Content-Type","application/json");
			conn.setRequestProperty("Accept", "application/json");
		}
		public void writeHeader(OutputStream os) {
			
		}
		public void writeFooter(OutputStream os) {
			
		}
		public byte[] getBytes() {
			try {
				return this.toJSON().getBytes("UTF-8");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null;
		}
	}
	
	public static String post(SendableObject stuffToPost, ConnectivityManager connMgr) {
		NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
		if (networkInfo != null && networkInfo.isConnected()) {
			try {
				return doThePost(stuffToPost);
			} catch (IOException e) {
				e.printStackTrace();
				return ERROR;
			}
		} else {
			return ERROR;
		}
	}
	
	private static String doThePost(SendableObject stuffToPost) throws IOException {
		InputStream is = null;
		// Only display the first 500 characters of the retrieved
		// web page content.
		// TODO: This length is probably too small. Is there a better way to do this?
		int len = 15000;

		try {
			// The URL for the post.
			URL url = new URL(stuffToPost.url);
			// Define the connection and set initial parameters.
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setReadTimeout(10000 /* milliseconds */);
			conn.setConnectTimeout(15000 /* milliseconds */);
			conn.setDoInput(true);
			if (stuffToPost.shouldPost()) {
				conn.setRequestMethod("POST");
				conn.setDoOutput(true);
				// Build the body.
				/* conn.setRequestProperty("Content-Type","application/json");
				conn.setRequestProperty("Accept", "application/json"); */
				stuffToPost.setConnectionProperties(conn);
				// Start the query.
				conn.connect();
			} else {
				conn.setRequestMethod("GET");
				conn.setDoOutput(false);
			}

			if (stuffToPost.shouldPost()) {
				OutputStream outputStream = conn.getOutputStream();
				stuffToPost.writeHeader(outputStream);
				//outputStream.write(stuffToPost.getBytes());
				DataOutputStream dos = new DataOutputStream(outputStream);
				dos.write(stuffToPost.getBytes());
				stuffToPost.writeFooter(outputStream);
				outputStream.close();
			}
			int response = conn.getResponseCode();
			Log.d("Tatewty:response", "The response is: " + response);
			
			is = conn.getInputStream();

			// Convert the InputStream into a string
			String contentAsString = readIt(is, len);
			return contentAsString;			
			
			// Makes sure that the InputStream is closed after the app is
			// finished using it.
		} finally {
			if (is != null) {
				is.close();
			}
		}
	}

	// Reads an InputStream and converts it to a String.
	private static String readIt(InputStream stream, int len) throws IOException,
			UnsupportedEncodingException {
		Reader reader = null;
		reader = new InputStreamReader(stream, "UTF-8");
		char[] buffer = new char[len];
		reader.read(buffer);
		return new String(buffer);
	}

}
